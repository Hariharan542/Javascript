 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
import Department from 'App/Models/Department'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DepartmentsController {
    public async insert({request}:HttpContextContract){
        const val=await request.validate(DepartmentValidator)
        let dept=new Department()
        dept.departmentId=val['departmentId']
        dept.departmentName=val['departmentName']
        await dept.save()
        return Department.all()
    }
    public async delete({request}){
        try{
        const id = request.input('departmentId')
        const a = await Department.findOrFail(id)
    await a.delete()
    return "table deleted"
        }catch{
            return ('id not found')
        }
    }
    public async update({request}:HttpContextContract){
        try{
        const val=await request.validate(DepartmentValidator)
        const a=await Department.findOrFail(request.input('departmentId'))
    a.departmentName=val['departmentName']
    a.save()
    return "table updated"
        }catch{
            return ('id not found')
        }
    }
    public async view(){
    return Department.all()
    }
    public async viewby({request}:HttpContextContract){
        try{
        const display=await Department.findByOrFail('departmentId',request.input('departmentId'))
        return display
        }catch{
            return('id not found')
        }
    }
    public async joint({}){
        const j=await Database.from('departments')
        .join('students','students.department_id','=','departments.department_id')
        .select('departments.*')
        .select('students.*')
        return j
    }
}
