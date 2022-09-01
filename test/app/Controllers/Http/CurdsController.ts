import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Db1 from 'App/Models/Db1'
import table from 'App/Models/Db1'
export default class CurdsController {

    public async create({request}:HttpContextContract){
        let stud=new table()
        stud.id=request.input('id')
        stud.name=request.input('name')
        stud.dept=request.input('dept')
        stud.save()
        return "table created"
    }
    public async del(){
        const a=await Db1.findByOrFail('id',102)
        await a.delete()
        return "table deleted"
    }
    public async upd(){
        const a=await Db1.findByOrFail('name','hari')
        a.id=1
        await a.save()
        return "table updated"
    }
    public async read(){
        return Db1.all()
    }
}
