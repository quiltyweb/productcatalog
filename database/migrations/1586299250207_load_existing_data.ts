import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'

export default class LoadExistingData extends BaseSchema {
  public async up () {
    // Code is run via ace CLI, so we assume PWD to be project root
    const categoriesFilePath = 'categories.json'
    const productsFilePath = 'products.json'

    await Database.beginGlobalTransaction()

    if (fs.existsSync(categoriesFilePath)) {
      await this.loadCategories(categoriesFilePath)
      await this.loadProducts(productsFilePath)
      await Database.commitGlobalTransaction()
    }
  }

  public async down () { }

  private async loadCategories (categoriesFilePath: string) {
    const categories = await JSON.parse(fs.readFileSync(categoriesFilePath, 'utf8'))

    try {
      await Database
        .insertQuery()
        .table('categories')
        .multiInsert(categories)
    } catch (error) {
      await Database.rollbackGlobalTransaction()
      throw error
    }
  }

  private async loadProducts (productsFilePath: string) {
    if (!fs.existsSync(productsFilePath)) {
      return
    }

    const products = await JSON.parse(fs.readFileSync(productsFilePath, 'utf8'))

    try {
      await Database
        .insertQuery()
        .table('products')
        .multiInsert(products)
    } catch (error) {
      await Database.rollbackGlobalTransaction()
      throw error
    }
  }
}
