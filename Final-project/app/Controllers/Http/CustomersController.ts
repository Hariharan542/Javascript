import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomerValidator from 'App/Validators/CustomerValidator'
import Customer from 'App/Models/Customer'

export default class CustomersController {
    public async create({request}:HttpContextContract){
        try{
            const payload=await request.validate(CustomerValidator)
            let customer=new Customer()
            customer.customerId=payload['customerId']
            customer.customerName=payload['customerName']
            customer.customerEmail=payload['customerEmail']
            customer.customerPhone=payload['customerPhone']
            await customer.save()
            return customer
        }catch{
            return 'invalid input'
        }
    }
    public async drop({ request }) {
        try {
            const a = await Customer.findOrFail(request.params().customer_id)
            await a.delete()
            return "table deleted"
        } catch {
            return ('id not found')
        }
    }
    public async update({ request }: HttpContextContract) {
         try {
            const val = await request.validate(CustomerValidator)
            const a = await Customer.findOrFail(request.input('customerId'))
            a.customerName = val['customerName']
            a.customerEmail = val['customerEmail']
            a.customerPhone = val['customerPhone']
            a.save()
            return "table updated"
        } catch {
            return ('id not found')
        }
    }
    public async read(){
        return Customer.all()
    }
    public async search({ request }: HttpContextContract) {
        const a=request.input('val')
        if(/^[0-9]/.test(a) && a.length<5){
            return Customer.query().where("customerId",a)
        }else{
            return Customer.query().where("customerName",a).orWhere("customerEmail",a).orWhere("customerPhone",a)
        }
    }
    public async idA(){
        return Customer.query().orderBy("customer_id","asc")        }
    public async idD(){
        return Customer.query().orderBy("customer_id","desc")        }
    public async nameA(){
        return Customer.query().orderBy("customer_name","asc")        }
    public async nameD(){
        return Customer.query().orderBy("customer_name","desc")        }
    public async phoneA(){
         return Customer.query().orderBy("customer_phone","asc")       }
    public async phoneD(){
        return Customer.query().orderBy("customer_phone","desc")       }
    public async emailA(){
        return Customer.query().orderBy("customer_email","asc")       }
    public async emailD(){
        return Customer.query().orderBy("customer_email","desc")       }
}
