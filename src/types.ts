import type { Context as KoaContext } from "koa";

import type { SendEmail } from "./email";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSource = any;

export type TContext = KoaContext & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  sendEmail: SendEmail;
};
