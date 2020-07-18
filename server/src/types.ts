import type { Context as KoaContext } from "koa";
import type { EntityManager } from "typeorm";

import type { SendEmail } from "./email";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSource = any;

export type TContext = KoaContext & {
  sendEmail: SendEmail;
  entityManager: EntityManager;
};
