import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public name: string

  @hasMany(() => Product)
  public products: HasMany<Product>
}
