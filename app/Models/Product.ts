import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public categoryId: number
  @column()
  public name: string
  @column()
  public description: string
  @column()
  public imagePath: string
  @column()
  public puchasePrice: string
  @column()
  public salePrice: string
  @column()
  // NOTE: The name 'supplierName' is based on the fact that almost all
  // existing data refer to a supplier's name, but some of them use
  // the supplier's business ID. It's unclear whether this will eventually
  // need to be made consistent.
  public supplierName: string
  @column()
  public attachmentPath: string

  @belongsTo(() => Category)
  public category: BelongsTo<Category>
}
