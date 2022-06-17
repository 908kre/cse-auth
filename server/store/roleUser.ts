import { Row, Sql } from "postgres";
import { first } from "lodash";
import { RoleUser } from "@csea/core/roleUser";
import { RoleUserStore } from "@csea/core";

const COLUMNS = [
  "id",
  "role_id",
  "created_at",
] as const

export const Store = (sql: Sql<any>): RoleUserStore => {
  const to = (r: Row): RoleUser => {
    return RoleUser({
      id: r.id,
      roleId: r.role_id,
      createdAt: r.created_at,
    });
  };

  const from = (r: RoleUser): Row => {
    return {
      id: r.id,
      role_id: r.roleId,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
  }): Promise<RoleUser | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id } = payload;
        if (id !== undefined) {
          return await sql`SELECT * FROM role_users WHERE id=${id}`;
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
  }): Promise<RoleUser[] | Error> => {
    try {
      const { ids } = payload;
      let rows = [];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT  * FROM role_users WHERE id IN (${ids})`;
      } else {
        rows = await sql`SELECT * FROM role_users`;
      }
      if(rows.length === 0){
        return []
      }
      const roleUsers = rows.map(to)
      return roleUsers;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: RoleUser): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO role_users ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };
  const update = async (payload: RoleUser): Promise<void | Error> => {
    try {
      await sql`UPDATE role_users SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
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
        await sql`DELETE FROM role_users WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE role_users`;
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
