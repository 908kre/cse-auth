import { SignIn } from "@csea/core/auth";
import { FastifyPlugin } from "fastify";
import { Lock, Store, Auth, TOKEN_KEY, ReqKind, ReqInput } from "@csea/core";
import { Runner } from "@csea/core/runner";
import { JwtAuth } from "../auth";

export const Routes = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
  runner: Runner;
  secret: string;
}): FastifyPlugin<{ prefix: string }> => {
  const signIn = SignIn({
    ...props,
    kind: ReqKind.SignIn
  });
  return function (app, opts, done) {
    app.post<{
      Body: (ReqInput & { kind: ReqKind.SignIn }) ['payload'];
    }>("/sign-in", {}, async (req, reply) => {
      const res = await props.runner(signIn, req.body);
      reply.send(res);
    });
    app.get("/verify", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res =  await props.auth.verify({ token });
      reply.send(res);
    });
    done();
  };
};
export default Routes;
