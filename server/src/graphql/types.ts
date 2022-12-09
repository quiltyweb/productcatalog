import { Request, Response } from "express";
import type { EntityManager } from "typeorm";

import type { SendEmail } from "../email";

// graphql package uses 'any' type so we will too
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TSource = any;

export type TContext = {
  req: Request;
  res: Response;
  sendEmail: SendEmail;
  entityManager: EntityManager;
};
