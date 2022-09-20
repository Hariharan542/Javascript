import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('customer_id').primary()
      table.string('customer_name')
      table.string('customer_email')
      table.string('customer_phone')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
  
}
