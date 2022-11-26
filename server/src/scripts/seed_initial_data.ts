import fs from "fs";
import path from "path";

import { AppDataSource } from "../dataSource";
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
    const productEntity = new Product({
      category: categories[product.categoryId - 1],
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      attachmentPath: product.attachmentPath,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      supplierName: product.supplierName,
    });

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

  AppDataSource.initialize()
    .then(async () => {
      AppDataSource.transaction(async (transactionalEntityManager) => {
        if (!fs.existsSync(categoriesFilePath)) return;

        await loadCategories(categoriesFilePath, transactionalEntityManager);
        await loadProducts(productsFilePath, transactionalEntityManager);
      });
    })
    .catch((error) => console.error(error));
}

seedInitialData();
