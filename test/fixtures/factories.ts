import faker from "faker";

import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Product";

type ProductFactoryOptions = {
  category?: Category;
  name?: string;
  description?: string;
  imagePath?: string;
  attachmentPath?: string;
  purchasePrice?: number;
  salePrice?: number;
  supplierName?: string;
};

type CategoryFactoryOptions = {
  name?: string;
  products?: Array<Product>;
};

const newCategory = (categoryOptions: CategoryFactoryOptions): Category => {
  const defaultCategoryAttributes = {
    name: faker.commerce.productAdjective(),
    products: [],
  };

  const categoryAttributes = {
    ...defaultCategoryAttributes,
    ...categoryOptions,
  };

  const category = new Category(categoryAttributes.name);
  category.products = categoryAttributes.products;

  return category;
};

const CategoryFactory = {
  buildMany: (
    count: number,
    categoryOptions: CategoryFactoryOptions = {}
  ): Array<Category> => {
    return Array(count)
      .fill(null)
      .map(() => newCategory(categoryOptions));
  },

  build: (categoryOptions: CategoryFactoryOptions = {}): Category => {
    return newCategory(categoryOptions);
  },
};

const newProduct = (productOptions: ProductFactoryOptions): Product => {
  const REASONABLE_MIN_PRICE = 10_000;
  const REASONABLE_MAX_PRICE = 100_000;

  const defaultPurchasePrice = faker.random.number({
    min: REASONABLE_MIN_PRICE,
    max: REASONABLE_MAX_PRICE,
  });

  const defaultProductAttributes = {
    category: CategoryFactory.build(),
    name: faker.commerce.productName(),
    purchasePrice: defaultPurchasePrice,
    salePrice: defaultPurchasePrice + 1,
    description: faker.lorem.paragraph(),
    imagePath: faker.internet.url(),
    attachmentPath: faker.internet.url(),
    supplierName: faker.company.companyName(),
  };

  const productAttributes = { ...defaultProductAttributes, ...productOptions };

  return new Product(productAttributes);
};

const ProductFactory = {
  buildMany: (
    count: number,
    productOptions: ProductFactoryOptions = {}
  ): Array<Product> => {
    return Array(count)
      .fill(null)
      .map(() => newProduct(productOptions));
  },
  build: (productOptions: ProductFactoryOptions = {}): Product => {
    return newProduct(productOptions);
  },
};

export { CategoryFactory, ProductFactory };
