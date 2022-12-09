import bcrypt from "bcrypt";
import { Router } from "express";
import AdminJSExpressjs from "@adminjs/express";
import AdminJS from "adminjs";

import type { DataSource } from "typeorm";

import { User } from "./entity/User";

const { APP_KEY, NODE_ENV } = process.env;

const authenticate =
  (dataSource: DataSource) =>
  async (email: string, password: string): Promise<User> | null => {
    const user = await dataSource.manager.findOne(User, {
      where: { email },
    });
    const { encryptedPassword = "" } = user || {};
    const matched = await bcrypt.compare(password, encryptedPassword);

    if (matched) return user;

    return null;
  };

export const buildCustomAuthRouter = (
  admin: AdminJS,
  dataSource: DataSource
): Router =>
  AdminJSExpressjs.buildAuthenticatedRouter(
    admin,
    {
      authenticate: authenticate(dataSource),
      cookieName: "gattoni:sess",
      cookiePassword: APP_KEY,
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: APP_KEY,
      cookie: {
        httpOnly: NODE_ENV === "production",
        secure: NODE_ENV === "production",
      },
      name: "gattoni:sess",
    }
  );
