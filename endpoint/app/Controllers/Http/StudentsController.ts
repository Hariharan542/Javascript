import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StudentValidator from 'App/Validators/StudentValidator'
import Student from 'App/Models/Student'
import Database from '@ioc:Adonis/Lucid/Database'

export default class StudentsController {
    public async create({request}:HttpContextContract){
        const payload=await request.validate(StudentValidator)
    let stud=new Student()
    stud.studentId=payload['studentId']
    stud.studentName=payload['studentName']
    stud.departmentId=payload['departmentId']
    stud.save()
    return stud
    }
    
    public async del({request}){
        try{
        const id = request.input('studentId')
        const a = await Student.findOrFail(id)
    await a.delete()
    return "table deleted"
        }catch{
            return('student id not found')
        }
    }
    public async upd({request}:HttpContextContract){
        try{
        const val=await request.validate(StudentValidator)
        const a=await Student.findOrFail(request.input('studentId'))
    a.departmentId=val['departmentId']
    a.studentName=val['studentName']
    a.save()
    return "table updated"
        }catch{
            return('student id not found')
        }
    }
    public async read(){
    return Student.all()
    }
    public async readby({request}:HttpContextContract){
        try{
        const a=await Student.findByOrFail('studentId',request.input('studentId'))
        return a
        }catch{
            return('student id not found')
        }
    }
    public async merge({}){
        const j=await Database.from('students')
        .join('departments','students.department_id','=','departments.department_id')
        .select('students.*')
        .select('departments.*')
        return j
    }
}
