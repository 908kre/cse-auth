import { Row, Sql } from "postgres";
import { first } from "lodash";
import { System } from "@csea/core/system";
import { SystemStore } from "@csea/core";

const COLUMNS = [
  "id",
  "name",
  "code",
  "created_at",
] as const

export const Store = (sql: Sql<any>): SystemStore => {
  const to = (r: Row): System => {
    return System({
      id: r.id,
      name: r.name,
      code: r.code,
      createdAt: r.created_at,
    });
  };

  const from = (r: System): Row => {
    return {
      id: r.id,
      name: r.name,
      code: r.code,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
    name?: string
  }): Promise<System | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id, name } = payload;
        if (id !== undefined) {
          return await sql`SELECT * FROM systems WHERE id=${id}`;
        }
        if (name !== undefined) {
          return await sql`SELECT * FROM systems WHERE name=${name}`;
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
  }): Promise<System[] | Error> => {
    try {
      const { ids } = payload;
      let rows = [];
      const columns = [
        "id",
        "name",
        "code",
        "created_at",
      ];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT ${sql(
          columns
        )} FROM systems WHERE id IN (${ids})`;
      } else {
        rows = await sql`SELECT ${sql(columns)} FROM systems`;
      }
      if(rows.length === 0){
        return []
      }
      const systems = rows.map(to)
      return systems;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: System): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO workspaces ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };
  const update = async (payload: System): Promise<void | Error> => {
    try {
      await sql`UPDATE workspaces SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
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
        await sql`DELETE FROM systems WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE systems`;
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
