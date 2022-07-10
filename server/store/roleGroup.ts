import { Row, Sql } from "postgres";
import { first } from "lodash";
import { RoleGroup } from "@csea/core/roleGroup";
import { RoleGroupStore } from "@csea/core";

const COLUMNS = ["group_id", "role_id", "post", "created_at"] as const;

export const Store = (sql: Sql<any>): RoleGroupStore => {
  const to = (r: Row): RoleGroup => {
    return RoleGroup({
      groupId: r.group_id,
      roleId: r.role_id,
      post: r.post,
      createdAt: r.created_at,
    });
  };

  const from = (r: RoleGroup): Row => {
    return {
      group_id: r.groupId,
      role_id: r.roleId,
      post: r.post,
      created_at: r.createdAt,
    };
  };

  const find = async (payload: {
    groupId?: string;
    roleId?: string;
    post?: string;
  }): Promise<RoleGroup | undefined | Error> => {
    try {
      const rows = await (async () => {
        const { groupId, roleId, post } = payload;
        if (
          groupId !== undefined &&
          roleId !== undefined &&
          post !== undefined
        ) {
          return await sql`SELECT * FROM role_groups WHERE group_id=${groupId} AND role_id=${roleId} AND post=${post}`;
        }
        return [];
      })();
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
    roleId?:string;
    groupId?: string;
    post?: string;
  }): Promise<RoleGroup[] | Error> => {
    try {
      const { groupId, post, roleId } = payload;
      let rows = [];
      if(roleId !== undefined){
        rows = await sql`SELECT * FROM role_groups WHERE role_id = ${roleId}`;
      }if(groupId !== undefined && post!==undefined){
        rows = await sql`SELECT * FROM role_groups WHERE group_id = ${groupId} AND post=${post}`;
      }if (groupId !== undefined) {
        rows = await sql`SELECT * FROM role_groups WHERE group_id = ${groupId} AND post=''`;
      } else if(roleId ===undefined && groupId ===undefined && post===undefined){
        rows = await sql`SELECT * FROM role_groups`;
      }
      if (rows.length === 0) {
        return [];
      }
      const roleGroups = rows.map(to);
      return roleGroups;
    } catch (err) {
      return err;
    }
  };
  const insert = async (payload: RoleGroup): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO role_groups ${sql(from(payload), ...COLUMNS)}`;
    } catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: {
    groupId: string;
    roleId: string;
    post: string;
  }) => {
    try {
      const { groupId, roleId, post } = payload;
      await sql`DELETE FROM role_groups WHERE group_id=${groupId} AND role_id=${roleId} AND post=${post}`;
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
    clear,
    delete: delete_,
  };
};
export default Store;
