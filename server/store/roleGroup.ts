import { Row, Sql } from "postgres";
import { first } from "lodash";
import { RoleGroup } from "@csea/core/roleGroup";
import { RoleGroupStore } from "@csea/core";

const COLUMNS = [
  "id",
  "role_id",
  "post",
  "created_at",
] as const

export const Store = (sql: Sql<any>): RoleGroupStore => {
  const to = (r: Row): RoleGroup => {
    return RoleGroup({
      id: r.id,
      roleId: r.role_id,
      post: r.post,
      createdAt: r.created_at,
    });
  };

  const from = (r: RoleGroup): Row => {
    return {
      id: r.id,
      role_id: r.roleId,
      post: r.post,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
  }): Promise<RoleGroup | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id } = payload;
        if (id !== undefined) {
          return await sql`SELECT * FROM role_groups WHERE id=${id}`;
        }
        return []
      })()
      const row = first(rows.map(to));
      if (row === undefined) {
        return;
      }
      return row;
    } catch (err) {
      return err;
    }
  };

  const filter = async (payload: {
    ids?: string[];
  }): Promise<RoleGroup[] | Error> => {
    try {
      const { ids } = payload;
      let rows = [];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT  * FROM role_groups WHERE id IN (${ids})`;
      } else {
        rows = await sql`SELECT * FROM role_groups`;
      }
      if(rows.length === 0){
        return []
      }
      const roleGroups = rows.map(to)
      return roleGroups;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: RoleGroup): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO role_groups ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };
  const update = async (payload: RoleGroup): Promise<void | Error> => {
    try {
      await sql`UPDATE role_groups SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
    }catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: {
    id?: string;
  }) => {
    try {
      const { id } = payload;
      if (id !== undefined) {
        await sql`DELETE FROM role_groups WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE role_groups`;
    } catch (err) {
      return err;
    }
  };
  return {
    filter,
    find,
    insert,
    update,
    clear,
    delete: delete_,
  };
};
export default Store
