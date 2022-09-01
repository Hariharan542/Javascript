import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VarValidator from "App/Validators/VarValidator"
export default class ConsController {
    public async maths({request}:HttpContextContract){
        const payload=await request.validate(VarValidator)
        let a:number= payload['a']
        let b:number= payload['b']
        return ('add:'+(a+b))+'\n'+('sub:'+(a-b))+'\n'+('mul:'+(a*b))+'\n'+('Div:'+(a/b))
    }
}
