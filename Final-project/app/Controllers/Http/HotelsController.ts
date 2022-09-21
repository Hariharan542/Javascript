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
        return Hotel.all()
    }
    public async search({ request }: HttpContextContract) {
        const a=request.input('val')
        if(/^[0-9]/.test(a) && a.length<7){
            return Hotel.query().where("customerId",a).orWhere("hotelId",a).orWhere("doorNo",a).orWhere("pincode",a)
        }else{
            return Hotel.query().where("hotelName",a).orWhere("street",a).orWhere("landmark",a).orWhere("area",a)
        }
    }
    public async idA(){
        return Hotel.query().orderBy("customer_id","asc")        }
    public async idD(){
        return Hotel.query().orderBy("customer_id","desc")        }
    public async hotelIdA(){
        return Hotel.query().orderBy("hotel_id","asc")        }
    public async hotelIdD(){
        return Hotel.query().orderBy("hotel_id","desc")        }
    public async nameA(){
        return Hotel.query().orderBy("hotel_name","asc")        }
    public async nameD(){
        return Hotel.query().orderBy("hotel_name","desc")        }
    public async doorNoA(){
         return Hotel.query().orderBy("doorNo","asc")       }
    public async doorNoD(){
        return Hotel.query().orderBy("doorNo","desc")       }
    public async streetA(){
        return Hotel.query().orderBy("street","asc")       }
    public async streetD(){
        return Hotel.query().orderBy("street","desc")       }
    public async landmarkA(){
        return Hotel.query().orderBy("landmark","asc")       }
    public async landmarkD(){
        return Hotel.query().orderBy("landmark","desc")       }
    public async areaA(){
        return Hotel.query().orderBy("area","asc")       }
    public async areaD(){
        return Hotel.query().orderBy("area","desc")       }
    public async pincodeA(){
        return Hotel.query().orderBy("pincode","asc")       }
    public async pincodeD(){
        return Hotel.query().orderBy("pincode","desc")       }
    
    public async custName()
    {
        return   Database
        .from('hotels')
        .join('customers', 'customers.customer_id', 'hotels.customer_id')
        .select('hotels.*')
        .select('customers.customer_name')
    }
    public async address(){
        const a=Database
        .from('hotels')
        .select('door_no','street','landmark','area','pincode')
        return a
    }


}

