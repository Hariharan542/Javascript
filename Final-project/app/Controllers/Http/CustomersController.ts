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
        return   Customer.query()
        .where((query)=>{
            if(/^[0-9]/.test(a) && a.length<5){
                query
                .where("customers.customer_id",a)}

            else{
                 query.where("customer_name",'ilike','%' + a +'%')
                 .orWhere("customer_email",'iLike','%' + a +'%').orWhere("customer_phone",a)
            }
            })
            .leftJoin('hotels', 'customers.customer_id','=', 'hotels.customer_id')
            .select('customers.*')
            .groupBy('customers.customer_id')
            .count('customers.customer_id as count')
            .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                d.map(h => {
                 const data = h.toJSON()
                 return {
                     ...data,
                   count: h.$extras.count,
                 }
               })
             )
    }
    public async sort({request}:HttpContextContract){
        let column=request.input('val')
        let process=request.input('order')
        return await Customer.query()
        .leftJoin('hotels', 'customers.customer_id','=', 'hotels.customer_id')
        .select('customers.*')
        .count('customers.customer_id as count')
        .groupBy("customers.customer_id")
        .orderBy(column,process)
        .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            d.map(h => {
             const data = h.toJSON()
             return {
                 ...data,
               count: h.$extras.count,
             }
           })
         )
    }
    public async count()
    {
        const a=await Customer.query()
        .leftJoin('hotels', 'customers.customer_id','=', 'hotels.customer_id')
        .select('customers.*')
        .groupBy('customers.customer_id')
        .count('customers.customer_id as count')
        .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
         d.map(h => {
          const data = h.toJSON()
          return {
              ...data,
            count: h.$extras.count,
          }
        })
      )
    return a
    
    }
}
