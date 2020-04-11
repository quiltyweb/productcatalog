import * as fs from 'fs'
import * as path from 'path'
import { createConnection } from 'typeorm'
import type { EntityManager } from 'typeorm'

import { Category } from '../entity/Category'
import { Product } from '../entity/Product'

async function loadCategories (categoriesFilePath: string, transactionalEntityManager: EntityManager): Promise<void> {
  const categories = await JSON.parse(fs.readFileSync(categoriesFilePath, 'utf8'))

  await transactionalEntityManager.insert(Category, categories)
}

async function loadProducts (productsFilePath: string, transactionalEntityManager: EntityManager): Promise<void> {
  if (!fs.existsSync(productsFilePath)) return

  const products = await JSON.parse(fs.readFileSync(productsFilePath, 'utf8'))

  await transactionalEntityManager.insert(Product, products)
}

async function seedInitialData (): Promise<void> {
  const categoriesFilePath = path.join(__dirname, '../../database/backups', 'categories.json')
  const productsFilePath = path.join(__dirname, '../../database/backups', 'products.json')

  createConnection().then(async connection => {
    connection.transaction(async transactionalEntityManager => {
      if (!fs.existsSync(categoriesFilePath)) return

      await loadCategories(categoriesFilePath, transactionalEntityManager)
      await loadProducts(productsFilePath, transactionalEntityManager)
    })
  }).catch(error => console.error(error))
}

seedInitialData()
