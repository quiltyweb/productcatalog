import { createConnection, Connection } from "typeorm";
import { ProductFactory, CategoryFactory } from "./factories";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Product";

const seedDB = async () => {
  const connection: Connection = await createConnection("test");
  // const baseContext= { entityManager: connection.manager }; // TODO: when to use this?

    const recordCount = 5;

    const categories = CategoryFactory.buildMany(recordCount);
    await connection.manager.save(Category, categories);
    const categoryRecords = await connection.manager.find(Category);

    const products = categoryRecords.flatMap((category: Category) =>
      ProductFactory.buildMany(recordCount, { category })
    );

    await connection.manager.save(Product, products);

    // TODO: should I close the connection?
}

seedDB()