import { SignInFn } from "@csea/core/auth";
import { FastifyPlugin } from "fastify";
import { Lock, Store, Auth, TOKEN_KEY } from "@csea/core";
import { JwtAuth } from "../auth";

export const Routes = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
  secret: string;
}): FastifyPlugin<{ prefix: string }> => {
  const signIn = SignInFn(props);
  return function (app, opts, done) {
    app.post<{
      Body: Parameters<SignInFn>[0];
    }>("/sign-in", {}, async (request) => {
      return await signIn(request.body);
    });
    app.get("/verify", {}, async (request) => {
      return await props.auth.verify(request.headers[TOKEN_KEY]?.toString());
    });
    done();
  };
};
export default Routes;
