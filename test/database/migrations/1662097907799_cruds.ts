import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cruds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary()
      table.string('name')
      table.integer('dept_id').references('dept_id').inTable('joins')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
