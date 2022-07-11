import { Sql } from "postgres";
import { Store, Lock, Auth } from "@csea/core";
import { FastifyPlugin } from "fastify";
import {
  FilterFn,
  CreateFn,
  DeleteFn,
  UpdateFn,
  SetAdminFn,
} from "@csea/core/user";
import { getToken } from "@csea/server/utils"
import { TOKEN_KEY } from "@csea/core"

export const Routes = (props: {
  store: Store;
  lock: Lock;
  auth: Auth;
}): FastifyPlugin<{ prefix: string }> => {
  const create = CreateFn(props)
  const update = UpdateFn(props)
  const delete_ = DeleteFn(props)
  const filter = FilterFn(props)

  return function (app, opts, done) {
    app.post<{ Body: Parameters<CreateFn>[0] }>("/create", {}, async (req, reply) => {
      const token = getToken(req)
      const res = await create({
        ...req.body,
        token
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<UpdateFn>[0] }>("/update", {}, async (req, reply) => {
      const token = getToken(req)
      const res = await update({
        ...req.body,
        token
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<DeleteFn>[0] }>("/delete", {}, async (req, reply) => {
      const token = getToken(req)
      const res = await delete_({
        ...req.body,
        token
      });
      reply.send(res);
    });
    app.post<{ Body: Parameters<FilterFn>[0] }>("/filter", {}, async (req, reply) => {
      const token = getToken(req)
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
