import fastify, { FastifyPlugin } from "fastify";
import path from "path";
import fastifyStatic from "fastify-static";


export const App = () => {
  const app = fastify({
    bodyLimit: 12485760,
    logger: true,
  });
  // const prefix = path.join("/", process.env.PREFIX || "", "/api/v1");
  //
  app.register(fastifyStatic, {
    root: "/app/web/dist",
  });
  app.ready(async () => {
    console.log(app.printRoutes());
  });
  return app;
};
