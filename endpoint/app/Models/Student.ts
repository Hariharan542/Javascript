import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public studentId: number
  @column()
  public studentName:string
  @column()
  public departmentId:number

}
