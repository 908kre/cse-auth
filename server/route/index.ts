import fastify, { FastifyPlugin } from "fastify";
import path from "path";
import fastifyStatic from "fastify-static";

import { Lock, Store, Auth } from "@csea/core";
import SystemRoutes from "./system";
import RoleRoutes from "./role";
import RoleUserRoutes from "./roleUser";
import RoleGroupRoutes from "./roleGroup";
import AuthRoutes from "./auth";

export const App = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
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
  app.register(AuthRoutes(props), { prefix: `${prefix}/auth` });
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
