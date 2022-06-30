import fastify, { FastifyPlugin } from "fastify";
import path from "path";
import fastifyStatic from "fastify-static";

import { Lock, Store, Auth, Logger } from "@csea/core";
import { Runner } from "@csea/core/runner";
import SystemRoutes from "./system";
import RoleRoutes from "./role";
import RoleUserRoutes from "./roleUser";
import RoleGroupRoutes from "./roleGroup";
import UserRoutes from "./user";
import AuthRoutes from "./auth";
import fastifyCookie from "@fastify/cookie"

export const App = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
  runner: Runner,
  logger: Logger
  secret: string;
}) => {
  const app = fastify({
    bodyLimit: 12485760,
    logger: true,
  });
  const prefix = path.join("/", process.env.PREFIX || "", "/api/v1");

  app.register(fastifyStatic, {
    root: "/app/web/dist",
  });
  app.register(SystemRoutes(props), {
    prefix: `${prefix}/system`,
  });
  app.register(RoleRoutes(props), {
    prefix: `${prefix}/role`,
  });
  app.register(RoleUserRoutes(props), {
    prefix: `${prefix}/role-user`,
  });
  app.register(RoleGroupRoutes(props), {
    prefix: `${prefix}/role-group`,
  });
  app.register(UserRoutes(props), {
    prefix: `${prefix}/user`,
  });
  app.register(AuthRoutes(props), { prefix: `${prefix}/auth` });
  app.register(fastifyCookie)
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
