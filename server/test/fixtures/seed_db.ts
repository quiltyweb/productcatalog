import { ProductFactory, CategoryFactory, UserFactory } from "./factories";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Product";
import { User, UserRole } from "../../src/entity/User";
import { AppDataSource } from "../../src/dataSource";

AppDataSource.initialize().then(async () => {
  const recordCount = 5;

  const user = UserFactory.build({
    email: "admin",
    encryptedPassword:
      "$2b$10$rvgafLIdwdfIadM7n.5mRen1Kpm3syocsJjIi7o9O8Z/bwd0kRhTO",
    role: UserRole.ADMIN,
  });
  await AppDataSource.manager.save(User, user);

  const categories = CategoryFactory.buildMany(recordCount);
  await AppDataSource.manager.save(Category, categories);
  const categoryRecords = await AppDataSource.manager.find(Category);

  const products = categoryRecords.flatMap((category: Category) =>
    ProductFactory.buildMany(recordCount, { category })
  );

  await AppDataSource.manager.save(Product, products);

  await AppDataSource.destroy();
});
