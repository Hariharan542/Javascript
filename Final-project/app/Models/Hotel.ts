
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public hotelId: number

  @column()
  public hotelName:string
  @column()
  public customerId:number
  @column()
  public doorNo:number
  @column()
  public street:string
  @column()
  public landmark:string
  @column()
  public area:string
  @column()
  public pincode:number
}
