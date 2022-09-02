import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Join from 'App/Models/Join'
import JoinValidator from 'App/Validators/JoinValidator'

export default class JoinsController {
    public async insert({request}:HttpContextContract){
        const val=await request.validate(JoinValidator)
        let dept=new Join()
        dept.deptId=val['deptId']
        dept.deptName=val['deptName']
        await dept.save()
        return Join.all()
    }
    public async delete({request}){
        const id = request.input('id')
        const a = await Join.findOrFail(id)
    await a.delete()
    return "table deleted"
    }
    public async update({request}:HttpContextContract){
        const val=await request.validate(JoinValidator)
        const a=await Join.findOrFail(request.input('deptId'))
    a.deptName=val['deptName']
    a.save()
    return "table updated"
    }
    public async view(){
    return Join.all()
    }
    public async viewby({request}:HttpContextContract){
        const display=await Join.findOrFail(request.input('deptId'))
        return display
    }
 
}
