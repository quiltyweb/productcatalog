function databaseInfo() {
  if (process.env.DATABASE_URL) return { url: process.env.DATABASE_URL }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: process.env.DB_NAME || '',
  }
}

module.exports = {
  ...databaseInfo(),
  name: 'default',
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    'src/entity/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
