import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public departmentId:number
  @column()
  public departmentName:string

}
