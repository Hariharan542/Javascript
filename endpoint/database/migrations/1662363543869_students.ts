import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('student_id').primary()
      table.string('student_name')
      table.integer('department_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
