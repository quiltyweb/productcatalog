import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected $tableName = 'products'

  public async up () {
    this.schema.createTable(this.$tableName, (table) => {
      table.increments('id')
      table.timestamps(true)
      table.integer('category_id').notNullable().references('id').inTable('categories')
      table.string('name', 80).notNullable().unique()
      table.text('description').notNullable().defaultTo('')
      table.string('image_path').notNullable().defaultTo('')
      table.integer('purchase_price').notNullable()
      table.integer('sale_price').notNullable()
      table.string('supplier_name').notNullable().defaultTo('')
      table.string('attachment_path').notNullable().defaultTo('')
    })
  }

  public async down () {
    this.schema.dropTable(this.$tableName)
  }
}
