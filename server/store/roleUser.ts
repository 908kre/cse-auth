import { Row, Sql } from "postgres";
import { first } from "lodash";
import { RoleUser } from "@csea/core/roleUser";
import { RoleUserStore } from "@csea/core";

const COLUMNS = ["user_id", "role_id", "created_at"] as const;

export const Store = (sql: Sql<any>): RoleUserStore => {
  const to = (r: Row): RoleUser => {
    return RoleUser({
      userId: r.user_id,
      roleId: r.role_id,
      createdAt: r.created_at,
    });
  };

  const from = (r: RoleUser): Row => {
    return {
      user_id: r.userId,
      role_id: r.roleId,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    userId?: string;
    roleId?: string;
  }): Promise<RoleUser | undefined | Error> => {
    try {
      const rows = await (async () => {
        const { userId, roleId } = payload;
        if (userId !== undefined && roleId !== undefined) {
          return await sql`SELECT * FROM role_users WHERE user_id=${userId} AND role_id=${roleId}`;
        }
        return [];
      })();
      return first(rows.map(to));
    } catch (err) {
      return err;
    }
  };

  const filter = async (payload: {
    userId?: string;
    roleId?: string;
  }): Promise<RoleUser[] | Error> => {
    try {
      const { userId, roleId } = payload;
      let rows = [];
      if(userId !== undefined && roleId !== undefined){
        rows = await sql`SELECT  * FROM role_users WHERE user_id=${userId} AND role_id=${roleId}`;
      }if (userId !== undefined) {
        rows = await sql`SELECT  * FROM role_users WHERE user_id  = ${userId}`;
      }if( roleId !== undefined){
        rows = await sql`SELECT  * FROM role_users WHERE role_id  = ${roleId}`;
      } else {
        rows = await sql`SELECT * FROM role_users`;
      }
      if (rows.length === 0) {
        return [];
      }
      const roleUsers = rows.map(to);
      return roleUsers;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: RoleUser): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO role_users ${sql(from(payload), ...COLUMNS)}`;
    } catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: { userId: string; roleId: string }) => {
    try {
      const { userId, roleId } = payload;
      await sql`DELETE FROM role_users WHERE user_id=${userId} AND role_id=${roleId}`;
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
    clear,
    delete: delete_,
  };
};
export default Store;
