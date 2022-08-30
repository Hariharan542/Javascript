// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ConsController {
    public async maths({request}){
        const a:number= request.input('a')
        const b:number= request.input('b')
        return ('add:'+(a+b))+'\n'+('sub:'+(a-b))+'\n'+('mul:'+(a*b))+'\n'+('Div:'+(a/b))
    }
}
