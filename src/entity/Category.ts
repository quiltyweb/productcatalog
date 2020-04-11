import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm'
import { Product } from './Product'

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number

  @CreateDateColumn()
  public createdAt: Date
  @UpdateDateColumn()
  public updatedAt: Date

  @Column()
  public name: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany(type => Product, product => product.category)
  public products: Product[]
}
