import { createConnection, Connection } from "typeorm";
import { ProductFactory, CategoryFactory, UserFactory } from "./factories";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Product";
import { User, UserRole } from "../../src/entity/User";

(async (): Promise<void> => {
  const connection: Connection = await createConnection("test");
  const recordCount = 5;

  const user = UserFactory.build({
    email: "admin",
    encryptedPassword:
      "$2b$10$rvgafLIdwdfIadM7n.5mRen1Kpm3syocsJjIi7o9O8Z/bwd0kRhTO",
    role: UserRole.ADMIN,
  });
  await connection.manager.save(User, user);

  const categories = CategoryFactory.buildMany(recordCount);
  await connection.manager.save(Category, categories);
  const categoryRecords = await connection.manager.find(Category);

  const products = categoryRecords.flatMap((category: Category) =>
    ProductFactory.buildMany(recordCount, { category })
  );

  await connection.manager.save(Product, products);

  await connection.close();
})();
