import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected $tableName = 'categories'

  public async up() {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.string('name', 80).notNullable().unique()
    })
  }

  public async down() {
    this.schema.dropTable(this.$tableName)
  }
}
