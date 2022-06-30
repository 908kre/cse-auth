import { Sql } from "postgres";
import { Store, Lock } from "@csea/core";
import { FastifyPlugin } from "fastify";
import {
  FilterFn,
  SetAdminFn,
} from "@csea/core/user";

export const Routes = (props: {
  store: Store;
  lock: Lock;
}): FastifyPlugin<{ prefix: string }> => {
  const setAdmin = SetAdminFn({store: props.store})
  const filter = FilterFn(props)

  return function (app, opts, done) {
    app.post<{ Body: Parameters<SetAdminFn>[0] }>("/set-admin", {}, async (req, reply) => {
      const res = await setAdmin(req.body);
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const res = await filter(req.body);
      reply.send(res);
    });
    done();
  };
};
export default Routes
