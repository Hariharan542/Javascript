//import { request } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'

export default class Mid {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(appKey!==request.header('appKey')){
      response.unauthorized({errror:'all not found'})
    }
    await next()
  }
}
