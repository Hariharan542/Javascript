import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'departments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('department_id').primary()
      table.string('department_name')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
