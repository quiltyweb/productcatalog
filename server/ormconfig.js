// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function databaseInfo() {
  if (process.env.DATABASE_URL) return { url: process.env.DATABASE_URL };

  return {
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: process.env.DB_NAME || "",
  };
}

const baseOrmConfig = {
  type: "postgres",
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

module.exports = [
  {
    ...baseOrmConfig,
    ...databaseInfo(),
    name: "default",
  },
  {
    ...baseOrmConfig,
    ...databaseInfo(),
    name: "test",
    synchronize: false,
    database: "test_" + (process.env.DB_NAME || ""),
  },
  {
    ...baseOrmConfig,
    ...databaseInfo(),
    name: "production",
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
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
