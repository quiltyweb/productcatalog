import "reflect-metadata";
import { DataSource } from "typeorm";

const { DATABASE_URL_COCKROACHDB, DATABASE_URL, NODE_ENV } = process.env;

const dbUrl = new URL(DATABASE_URL_COCKROACHDB || DATABASE_URL);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

const defineOrmResources = (nodeEnv: typeof NODE_ENV) => {
  if (nodeEnv === "production")
    return {
      entities: ["dist/src/entity/**/*.js"],
      migrations: ["dist/src/migration/**/*.js"],
      subscribers: ["dist/src/subscriber/**/*.js"],
    };

  return {
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  };
};

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  host: "localhost",
  port: 26257,
  username: "root",
  password: "",
  database: "defaultdb",
  synchronize: false,
  logging: false,
  url: dbUrl.toString(),
  ssl: NODE_ENV === "production",
  extra: {
    options: routingId,
  },
  ...defineOrmResources(NODE_ENV),
});
