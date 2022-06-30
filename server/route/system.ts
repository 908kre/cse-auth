import { Sql } from "postgres";
import { Store, Lock, Auth } from "@csea/core";
import { FastifyPlugin } from "fastify";
import {
  CreateFn,
  UpdateFn,
  FindFn,
  FilterFn,
  DeleteFn,
} from "@csea/core/system";
import { TOKEN_KEY } from "@csea/core"

export const Routes = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
}): FastifyPlugin<{ prefix: string }> => {
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const delete_ = DeleteFn(props)
  const find = FindFn(props)
  const filter = FilterFn(props)
  return function (app, opts, done) {
    app.post<{ Body: Parameters<CreateFn>[0] }>("/create", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await create({
        ...req.body,
        token,
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<UpdateFn>[0] }>("/update", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await update({
        ...req.body,
        token,
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<DeleteFn>[0] }>("/delete", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await delete_({
        ...req.body,
        token,
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<FindFn>[0] }>("/find", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await find({
        ...req.body,
        token,
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const token = req.headers[TOKEN_KEY]?.toString()
      const res = await filter({
        ...req.body,
        token,
      });
      reply.send(res);
    });
    done();
  };
};
export default Routes
