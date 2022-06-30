import { Sql } from "postgres";
import { Store, Lock, Auth } from "@csea/core";
import { FastifyPlugin } from "fastify";
import {
  FilterFn,
  SetAdminFn,
} from "@csea/core/user";
import { TOKEN_KEY } from "@csea/core"

export const Routes = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
}): FastifyPlugin<{ prefix: string }> => {
  const setAdmin = SetAdminFn({store: props.store})
  const filter = FilterFn(props)

  return function (app, opts, done) {
    app.post<{ Body: Parameters<SetAdminFn>[0] }>("/set-admin", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await setAdmin({
        ...req.body,
        token
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await filter({
        ...req.body,
        token
      });
      reply.send(res);
    });
    done();
  };
};
export default Routes
