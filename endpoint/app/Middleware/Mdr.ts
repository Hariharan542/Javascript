import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'

export default class Mdr {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    if(appKey!==request.header('appKey')){
      response.unauthorized({errror:'all not found'})
    }
    await next()
  }
}
