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
            hotel.doorNo=payload.address.doorNo
            hotel.street=payload.address.street
            hotel.landmark=payload.address.landmark
            hotel.area=payload.address.area
            hotel.pincode=payload.address.pincode
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
        console.log(request)
         try {
            const val = await request.validate(HotelValidator)
            console.log(val)
            const a = await Hotel.findOrFail(val['hotelId'])
            a.hotelName=val['hotelName']
            a.customerId=val['customerId']
            a.doorNo=val.address.doorNo
            a.street=val.address.street
            a.landmark=val.address.landmark
            a.area=val.address.area
            a.pincode=val.address.pincode
            a.save()
            
        } catch {
            return ('id not found')
        }
    }
    // public async search({ request }: HttpContextContract) {
    //     const a=request.input('val')
    //     if(/^[0-9]/.test(a) && a.length<7){
    //         return Hotel.query().where("customerId",a).orWhere("hotelId",a).orWhere("doorNo",a).orWhere("pincode",a)
    //     }else{
    //         return Hotel.query().where("hotelName",a).orWhere("street",a).orWhere("landmark",a).orWhere("area",a)
    //     }
    // }   
    public async search({ request }: HttpContextContract) {
        const a=request.input('val')
        return   Hotel.query()
        .where((query)=>{
            if(/^[0-9]/.test(a) && a.length<7){
                query
                .where("hotels.customer_id",a).orWhere("hotels.hotel_id",a).orWhere("hotels.door_no",a).orWhere("hotels.pincode",a)}

            else{
                 query.where("hotel_name",'ilike','%' + a +'%')
                 .orWhere("street",'iLike','%' + a +'%').orWhere("landmark",'iLike','%' + a +'%').orWhere("area",'iLike','%' + a +'%')
            }
            })
            .leftJoin('customers', 'customers.customer_id','=', 'hotels.customer_id')
            .select('hotel_name', 'hotel_id','customers.customer_name','hotels.customer_id')
            .select(Database.raw(`json_build_object('doorNo', door_no, 'landmark', landmark,'area',area, 'pincode',pincode) as address`))
            .groupBy('hotels.hotel_id','customers.customer_id')
            .then(d =>                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                d.map(h => {
                 const data = h.toJSON()
                 return {
                     ...data,
                     customerName:h.$extras.customer_name,
                   address: h.$extras.address
                 }
               })
             )
    } 
    public async sort({request}:HttpContextContract)
    {
        let column=request.input('val')
        let process=request.input('order')
        return  await Hotel.query()
        .leftJoin('customers', 'customers.customer_id', 'hotels.customer_id')
        .select('hotel_name', 'hotel_id','customers.customer_name','hotels.customer_id')
        .select(Database.raw(`json_build_object('doorNo', door_no, 'landmark', landmark,'area',area, 'pincode',pincode) as address`))
        .groupBy('hotels.hotel_id','customers.customer_id')
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
        .select(Database.raw(`json_build_object('doorNo', door_no, 'street',street,'landmark',landmark,'area',area, 'pincode',pincode) as address`))
        .groupBy('hotels.hotel_id','customers.customer_id')
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
    




