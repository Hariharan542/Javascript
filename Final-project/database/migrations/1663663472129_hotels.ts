import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('hotel_id').primary()
      table.string('hotel_name')
      table.integer('door_no')
      table.string('street')
      table.string('landmark')
      table.string('area')
      table.integer('customer_id')
      table.integer('pincode')

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
