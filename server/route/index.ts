import fastify, { FastifyPlugin } from "fastify";
import path from "path";
import fastifyStatic from "fastify-static";

import { Lock, Store, Auth } from "@csea/core";
import SystemRoutes from "./system";
import RoleRoutes from "./role";
import RoleUserRoutes from "./roleUser";
import RoleGroupRoutes from "./roleGroup";

export const App = (args: {
  store: Store;
  lock: Lock;
  auth: Auth;
  secret: string;
}) => {
  const { store, lock } = args;
  const app = fastify({
    bodyLimit: 12485760,
    logger: true,
  });
  const prefix = path.join("/", process.env.PREFIX || "", "/api/v1");

  app.register(fastifyStatic, {
    root: "/app/web/dist",
  });
  app.register(SystemRoutes({ store, lock }), {
    prefix: `${prefix}/system`,
  });
  app.register(RoleRoutes({ store, lock }), {
    prefix: `${prefix}/role`,
  });
  app.register(RoleUserRoutes({ store, lock }), {
    prefix: `${prefix}/role-user`,
  });
  app.register(RoleGroupRoutes({ store, lock }), {
    prefix: `${prefix}/role-group`,
  });
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
