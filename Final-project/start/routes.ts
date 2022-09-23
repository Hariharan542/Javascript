/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
    Route.post('create','CustomersController.create')
    Route.delete('drop/:customer_id','CustomersController.drop')
    Route.put('update','CustomersController.update')
    Route.get('read','CustomersController.read')
    Route.post('search','CustomersController.search')
    Route.post('sort','CustomersController.sort')
    Route.get('/count','CustomersController.count')
    // Route.get('/idD','CustomersController.idD')
    // Route.get('/nameA','CustomersController.nameA')
    // Route.get('/nameD','CustomersController.nameD')
    // Route.get('/phoneA','CustomersController.phoneA')
    // Route.get('/phoneD','CustomersController.phoneD')
    // Route.get('/emailA','CustomersController.emailA')
    // Route.get('/emailD','CustomersController.emailD')
    // Route.get('/count','CustomersController.count')
}).prefix('customer')

Route.group(()=>{
    Route.post('create','HotelsController.create')
    Route.delete('drop/:hotel_id','HotelsController.drop')
    Route.put('update','HotelsController.update')
    Route.get('read','HotelsController.read')
    Route.get('address','HotelsController.address')
    Route.post('search','HotelsController.search')
    Route.post('sort','HotelsController.sort')
    Route.post('/custName','HotelsController.custName')
    // Route.get('/idD','HotelsController.idD')
    // Route.get('/nameA','HotelsController.nameA')
    // Route.get('/nameD','HotelsController.nameD')
    // Route.get('/hotelIdA','HotelsController.hotelIdA')
    // Route.get('/hotelIdD','HotelsController.hotelIdD')
    // Route.get('/doorNoA','HotelsController.doorNoA')
    // Route.get('/doorNoD','HotelsController.doorNoD')
    // Route.get('/streetA','HotelsController.streetA')
    // Route.get('/streetD','HotelsController.streetD')
    // Route.get('/landmarkA','HotelsController.landmarkA')
    // Route.get('/landmarkD','HotelsController.landmarkD')
    // Route.get('/areaA','HotelsController.areaA')
    // Route.get('/areaD','HotelsController.areaD')
    // Route.get('/pincodeA','HotelsController.pincodeA')
    // Route.get('/pincodeD','HotelsController.pincodeD')
    // Route.get('/custName','HotelsController.custName')
}).prefix('hotel')
