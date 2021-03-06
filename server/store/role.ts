import { Row, Sql } from "postgres";
import { first } from "lodash";
import { Role } from "@csea/core/role";
import { RoleStore } from "@csea/core";

const COLUMNS = [
  "id",
  "name",
  "system_id",
  "created_at",
] as const

export const Store = (sql: Sql<any>): RoleStore => {
  const to = (r: Row): Role => {
    return Role({
      id: r.id,
      name: r.name,
      systemId: r.system_id,
      createdAt: r.created_at,
    });
  };

  const from = (r: Role): Row => {
    return {
      id: r.id,
      name: r.name,
      system_id: r.systemId,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    id?: string;
    systemId?: string;
    name?: string;
  }): Promise<Role | undefined | Error> => {
    try {
      const rows= await (async () => {
        const { id, systemId, name } = payload;
        if (name !== undefined && systemId !== undefined) {
          return await sql`SELECT * FROM roles WHERE name=${name} AND system_id=${systemId}`;
        }if(id !== undefined){
          return await sql`SELECT * FROM roles WHERE id=${id}`;
        }
        return []
      })()
      return first(rows.map(to));
    } catch (err) {
      return err;
    }
  };

  const filter = async (payload: {
    ids?: string[];
    systemId?: string;
    systemIds?: string[];
  }): Promise<Role[] | Error> => {
    try {
      const { ids, systemId, systemIds } = payload;
      let rows = [];
      if (ids !== undefined && ids.length > 0) {
        rows = await sql`SELECT  * FROM roles WHERE id IN (${ids})`;
      } 
      if (systemIds !== undefined && systemIds.length > 0) {
        rows = await sql`SELECT  * FROM roles WHERE system_id IN (${systemIds})`;
      } 
      if(systemId !== undefined){
        rows = await sql`SELECT  * FROM roles WHERE system_id = ${systemId}`;
      }
      else if(ids === undefined && systemId === undefined && systemIds === undefined) {
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
      await sql`UPDATE roles SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`; }catch (err) {
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
