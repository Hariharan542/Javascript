import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Crud from 'App/Models/Crud'
import CrudValidator from 'App/Validators/CrudValidator'
export default class CurdsController {

public async create({request}:HttpContextContract){
    const payload=await request.validate(CrudValidator)
let stud=new Crud()
stud.id=payload['id']
stud.name=payload['name']
stud.deptId=payload['deptId']
stud.save()
return stud
}
 
public async del({request}){
    const id = request.input('id')
    const a = await Crud.findOrFail(id)
await a.delete()
return "table deleted"
}
public async upd({request}:HttpContextContract){
    const val=await request.validate(CrudValidator)
    const a=await Crud.findOrFail(request.input('id'))
a.deptId=val['deptId']
a.name=val['name']
a.save()
return "table updated"
}
public async read(){
return Crud.all()
}
public async readby({request}:HttpContextContract){
    const a=await Crud.findByOrFail('name',request.params().name)
    return a
}
public async merge(){
    const j=await Database.from('cruds')
    .join('joins','cruds.dept_id','=','joins.dept_id')
    .select('cruds.*')
    .select('joins.*')
    .where('cruds.id',4)
    return j
}
}