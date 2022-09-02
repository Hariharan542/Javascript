

import Route from '@ioc:Adonis/Core/Route'

Route.post('create','OpersController.create').middleware('Mid')
Route.delete('del','OpersController.del').middleware('Mid')
Route.patch('upd','OpersController.upd').middleware('Mid')
Route.get('read','OpersController.read').middleware('Mid')
Route.post('readby/:name','OpersController.readby').middleware('Mid')

Route.get('merge','OpersController.merge').middleware('Mid')

Route.post('insert','JoinsController.insert').middleware('Mid')
Route.post('delete','JoinsController.delete').middleware('Mid')
Route.post('update','JoinsController.update').middleware('Mid')
Route.post('view','JoinsController.view').middleware('Mid')
Route.post('viewby/:name','JoinsController.viewby').middleware('Mid')