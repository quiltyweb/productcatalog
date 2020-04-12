import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { Category } from './Category'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date

  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public categoryId: number
  @Column()
  public name: string
  @Column()
  public description: string
  @Column()
  public imagePath: string
  @Column()
  public attachmentPath: string
  @Column()
  public purchasePrice: string
  @Column()
  public salePrice: string
  // NOTE: The name 'supplierName' is based on the fact that almost all
  // existing data refer to a supplier's name, but some of them use
  // the supplier's business ID. It's unclear whether this will eventually
  // need to be made consistent.
  @Column()
  public supplierName: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne(type => Category, category => category.products)
  public category: Category
}
