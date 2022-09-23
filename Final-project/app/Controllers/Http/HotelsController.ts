import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/HotelValidator'

export default class HotelsController {
    public async create({request}:HttpContextContract){
        try{
            const payload=await request.validate(HotelValidator)
            let hotel=new Hotel()
            hotel.hotelId=payload['hotelId']
            hotel.hotelName=payload['hotelName']
            hotel.customerId=payload['customerId']
            hotel.doorNo=payload['doorNo']
            hotel.street=payload['street']
            hotel.landmark=payload['landmark']
            hotel.area=payload['area']
            hotel.pincode=payload['pincode']
            await hotel.save()
            return hotel
        }catch{
            return 'invalid input'
        }
    }
    public async drop({ request }) {
        try {
            const a = await Hotel.findOrFail(request.params().hotel_id)
            await a.delete()
            return "table deleted"
        } catch {
            return ('id not found')
        }
    }
    public async update({ request }: HttpContextContract) {
         try {
            const val = await request.validate(HotelValidator)
            const a = await Hotel.findOrFail(request.input('hotelId'))
            a.hotelName=val['hotelName']
            a.customerId=val['customerId']
            a.doorNo=val['doorNo']
            a.street=val['street']
            a.landmark=val['landmark']
            a.area=val['area']
            a.pincode=val['pincode']
            a.save()
            return "table updated"
        } catch {
            return ('id not found')
        }
    }
    public async read(){
        return {address:await Hotel.query().leftJoin('Customer','hotels.customer_id','customers.customer_id'),hari:await Hotel.query().select('street')}
    }

    public async search({ request }: HttpContextContract) {
        const a=request.input('val')
        if(/^[0-9]/.test(a) && a.length<7){
            return Hotel.query().where("customerId",a).orWhere("hotelId",a).orWhere("doorNo",a).orWhere("pincode",a)
        }else{
            return Hotel.query().where("hotelName",a).orWhere("street",a).orWhere("landmark",a).orWhere("area",a)
        }
    }
    // public async sort({request}:HttpContextContract){
    //     let column=request.input('val')
    //     let process=request.input('order')
    //     return await Hotel.query()
    //     .join('customers', 'customers.customer_id','=', 'hotels.customer_id')
    //     .select('customers.*')
    //     .groupBy('customers.customer_id')
    //     .orderBy(column,process)
    //     .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    //         d.map(h => {
    //          const data = h.toJSON()
    //          return {
    //              ...data,
    //            count: h.$extras.count,
    //          }
    //        })
    //      )
    // }
    
    public async sort({request}:HttpContextContract)
    {
        let column=request.input('val')
        let process=request.input('order')
        return  await Hotel.query()
        .leftJoin('customers', 'customers.customer_id', 'hotels.customer_id')
        .select('hotel_name', 'hotel_id','customers.customer_name','hotels.customer_id')
        .select(Database.raw(`json_build_object('doorNo', door_no, 'landMark', landmark,'area','area', 'pincode',pincode) as address`))
        .orderBy(column,process)
        .then(d => d.map(h => {
            const data = h.toJSON()
            return {
                ...data,
                customerName:h.$extras.customer_name,
                address: h.$extras.address
            }
        }))
    }
    public async address(){
        let data =  await Hotel.query()
        .leftJoin('customers', 'customers.customer_id', 'hotels.customer_id')
        .select('hotel_name', 'hotel_id','customers.customer_name','hotels.customer_id')
        .select(Database.raw(`json_build_object('doorNo', door_no, 'landMark', landmark,'area','area', 'pincode',pincode) as address`))
        .then(d => d.map(h => {
            const data = h.toJSON()
            return {
                ...data,
                customerName:h.$extras.customer_name,
                address: h.$extras.address
            }
        }))
        return data
    }
}
    




