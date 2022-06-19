import * as AuthSrv from "@csea/core/auth";
import { FastifyPlugin } from "fastify";
import { store, lock, Auth } from ".";

export const routes: FastifyPlugin<{
  prefix: string;
}> = function (app, opts, done) {
  app.post<{
    Body: AuthSrv.SignInPayload;
  }>("/sign-in", {}, async (request) => {
    return await AuthSrv.signIn({
      auth: Auth(request),
      store,
      payload: request.body,
    });
  });
  app.get("/verify", {}, async (request) => {
    return await Auth(request).verify();
  });
  done();
};
