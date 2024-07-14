import { PrismaClient } from "@prisma/client";

export type { Category } from "@prisma/client";

const db = new PrismaClient();

export default db;
