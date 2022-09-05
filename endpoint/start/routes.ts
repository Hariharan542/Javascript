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
Route.post('create','StudentsController.create')
Route.delete('del','StudentsController.del')
Route.patch('upd','StudentsController.upd')
Route.get('read','StudentsController.read')
Route.post('readby','StudentsController.readby')

Route.get('merge','StudentsController.merge')
}).middleware('Mdr')

Route.group(()=>{
Route.post('insert','DepartmentsController.insert')
Route.delete('delete','DepartmentsController.delete')
Route.patch('update','DepartmentsController.update')
Route.get('view','DepartmentsController.view')
Route.post('viewby','DepartmentsController.viewby')

Route.get('joint','DepartmentsController.joint')
}).middleware('Mdr')

