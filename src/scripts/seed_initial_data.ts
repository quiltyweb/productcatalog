import fs from "fs";
import path from "path";
import { createConnection } from "typeorm";

import { Category } from "../entity/Category";
import { Product } from "../entity/Product";

import type { EntityManager } from "typeorm";

type ProductData = {
  categoryId: number;
  name: string;
  description: string;
  imagePath: string;
  attachmentPath: string;
  purchasePrice: number;
  salePrice: number;
  supplierName: string;
};

async function loadCategories(
  categoriesFilePath: string,
  transactionalEntityManager: EntityManager
): Promise<void> {
  const categories = JSON.parse(fs.readFileSync(categoriesFilePath, "utf8"));

  await transactionalEntityManager.insert(Category, categories);
}

async function loadProducts(
  productsFilePath: string,
  transactionalEntityManager: EntityManager
): Promise<void> {
  if (!fs.existsSync(productsFilePath)) return;

  const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
  const categories = await transactionalEntityManager.find(Category);

  const productEntities = products.map((product: ProductData) => {
    const productEntity = new Product();

    productEntity.category = categories[product.categoryId - 1];
    productEntity.name = product.name;
    productEntity.description = product.description;
    productEntity.imagePath = product.imagePath;
    productEntity.attachmentPath = product.attachmentPath;
    productEntity.purchasePrice = product.purchasePrice;
    productEntity.salePrice = product.salePrice;
    productEntity.supplierName = product.supplierName;

    return productEntity;
  });

  await transactionalEntityManager.save(Product, productEntities);
}

async function seedInitialData(): Promise<void> {
  const categoriesFilePath = path.join(
    __dirname,
    "../../database/backups",
    "categories.json"
  );
  const productsFilePath = path.join(
    __dirname,
    "../../database/backups",
    "products.json"
  );

  createConnection()
    .then(async (connection) => {
      connection.transaction(async (transactionalEntityManager) => {
        if (!fs.existsSync(categoriesFilePath)) return;

        await loadCategories(categoriesFilePath, transactionalEntityManager);
        await loadProducts(productsFilePath, transactionalEntityManager);
      });
    })
    .catch((error) => console.error(error));
}

seedInitialData();
