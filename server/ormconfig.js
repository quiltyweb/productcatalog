// eslint-disable-next-line @typescript-eslint/no-var-requires
const { URL } = require("url");

const baseOrmConfig = {
  type: "cockroachdb",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

const dbUrl = new URL(
  process.env.DATABASE_URL_COCKROACHDB || process.env.DATABASE_URL
);
const routingId = dbUrl.searchParams.get("options");
dbUrl.searchParams.delete("options");

module.exports = [
  {
    ...baseOrmConfig,
    name: "default",
    ssl: false,
    url: process.env.DATABASE_URL_COCKROACHDB || process.env.DATABASE_URL,
  },
  {
    ...baseOrmConfig,
    name: "test",
    ssl: false,
    url: process.env.DATABASE_URL_COCKROACHDB || process.env.DATABASE_URL,
  },
  {
    ...baseOrmConfig,
    name: "production",
    ssl: true,
    url: dbUrl.toString(),
    extra: {
      options: routingId,
    },
    entities: ["dist/src/entity/**/*.js"],
    migrations: ["dist/src/migration/**/*.js"],
    subscribers: ["dist/src/subscriber/**/*.js"],
    cli: {
      entitiesDir: "dist/src/entity",
      migrationsDir: "dist/src/migration",
      subscribersDir: "dist/src/subscriber",
    },
  },
];
