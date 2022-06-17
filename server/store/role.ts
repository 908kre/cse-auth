import { Row, Sql } from "postgres";
import { first } from "lodash";
import { Role } from "@csea/core/role";
import { RoleStore } from "@csea/core";

const COLUMNS = [
  "id",
  "name",
  "code",
  "system_id",
  "charge",
  "created_at",
] as const

export const Store = (sql: Sql<any>): RoleStore => {
  const to = (r: Row): Role => {
    return Role({
      id: r.id,
      name: r.name,
      code: r.code,
      systemId: r.system_id,
      charge: r.charge,
      createdAt: r.created_at,
    });
  };

  const from = (r: Role): Row => {
    return {
      id: r.id,
      name: r.name,
      code: r.code,
      system_id: r.systemId,
      charge: r.charge,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
    name?: string;
  }): Promise<Role | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id, name } = payload;
        if (id !== undefined) {
          return await sql`SELECT * FROM roles WHERE id=${id}`;
        }
        if (name !== undefined) {
          return await sql`SELECT * FROM roles WHERE name=${name}`;
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
  }): Promise<Role[] | Error> => {
    try {
      const { ids } = payload;
      let rows = [];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT  * FROM roles WHERE id IN (${ids})`;
      } else {
        rows = await sql`SELECT * FROM roles`;
      }
      if(rows.length === 0){
        return []
      }
      const roles = rows.map(to)
      return roles;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: Role): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO roles ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };
  const update = async (payload: Role): Promise<void | Error> => {
    try {
      await sql`UPDATE roles SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
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
        await sql`DELETE FROM roles WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE roles`;
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
