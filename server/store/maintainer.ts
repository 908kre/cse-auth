import { Row, Sql } from "postgres";
import { first } from "lodash";
import { Maintainer } from "@csea/core/maintainer";
import { MaintainerStore } from "@csea/core";

const COLUMNS = ["id", "system_id"] as const;

export const Store = (sql: Sql<any>): MaintainerStore => {
  const to = (r: Row): Maintainer => {
    return Maintainer({
      id: r.id,
      systemId: r.system_id,
    });
  };

  const from = (r: Maintainer): Row => {
    return {
      id: r.id,
      system_id: r.systemId,
    };
  };

  const find = async (payload: {
    id: string;
    systemId: string;
  }): Promise<Maintainer | undefined | Error> => {
    try {
      const rows = await (async () => {
        const { id, systemId } = payload;
        return await sql`SELECT * FROM  maintainers WHERE id=${id} AND system_id=${systemId}`;
      })();
      return first(rows.map(to));
    } catch (err) {
      return err;
    }
  };

  const filter = async (payload: {
    id?: string;
    systemId?: string;
  }): Promise<Maintainer[] | Error> => {
    try {
      const { id, systemId } = payload;
      let rows = [];
      if(id !== undefined && systemId !== undefined){
        rows = await sql`SELECT  * FROM maintainers WHERE id=${id} AND system_id=${systemId}`;
      }if (id !== undefined) {
        rows = await sql`SELECT  * FROM maintainers WHERE id=${id}`;
      }if( systemId !== undefined){
        rows = await sql`SELECT  * FROM maintainers WHERE system_id=${systemId}`;
      }else if(id === undefined && systemId === undefined){
        rows = await sql`SELECT * FROM maintainers`;
      }
      if (rows.length === 0) {
        return [];
      }
      const maintainers = rows.map(to);
      return maintainers;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: Maintainer): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO maintainers ${sql(from(payload), ...COLUMNS)}`;
    } catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: { id: string; systemId: string }) => {
    try {
      const { id, systemId } = payload;
      await sql`DELETE FROM maintainers WHERE id=${id} AND system_id=${systemId}`;
    } catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE maintainers`;
    } catch (err) {
      return err;
    }
  };
  return {
    filter,
    find,
    insert,
    clear,
    delete: delete_,
  };
};
export default Store;
