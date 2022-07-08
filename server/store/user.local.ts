import { Row, Sql } from "postgres";
import { first } from "lodash";
import { UserStore } from "@csea/core";
import { User, Owner } from "@csea/core/user";
import { Admin } from "@csea/core/auth";
import ErrorKind from "@csea/core/error";

const COLUMNS = [
  "id",
  "level"
] as const

const to = (r: Row): Owner => {
  return Owner({
    id: r.id,
    level: r.level
  });
};

const from = (r: Owner): Row => {
  return {
    id: r.id,
    level: r.level
  };
};

export const Store = (sql: Sql<any>): UserStore => {

  const find = async (payload: { id: string; password: string }) => {
    const { id, password } = payload
    if(id === "admin" && password === "admin"){
      return User({
        id: "AAA111633",
        name:"higuchi fumito",
        groupId: "1490",
        post: "0000",
        admin: Admin.Owner
      })
    }else if(id === "test" && password === "test"){
      return User({
        id: "AAA110800",
        name: "yao",
        groupId: "1490",
        post: "0000",
        admin: Admin.Maintainer,
      })
    }else if(id === "guest" && password === "guest"){
      return User({
        id: "AAA111111",
        name: "ikarashi",
        groupId: "1490",
        post: "0000",
        admin: Admin.Guest
      })
    }
    return new Error(ErrorKind.InvalidIdOrPassword)
  };

  const filter = async (payload: {}) => {
    try {
      let rows = [];
      rows = await sql`SELECT * FROM owners`;
      const owners = rows.map(to)
      return owners;
    } catch (err) {
      return err;
    }
  };

  const findOwner = async (payload: {id:string}) => {
    const { id } = payload
    try {
      let rows = [];
      rows = await sql`SELECT * FROM owners WHERE id=${id}`;
      const owner = first(rows.map(to))
      return owner;
    } catch (err) {
      return err;
    }
  };

  const delete_ = async (payload: {
    id?: string;
  }) => {
    try {
      const { id } = payload;
      if (id !== undefined) {
        await sql`DELETE FROM owners WHERE id=${id}`;
      }
    } catch (err) {
      return err;
    }
  };

  const insert = async (payload: Owner): Promise<void | Error> => {
    try {
      await sql`
      INSERT INTO owners ${sql(
        from(payload),...COLUMNS
      )}`;
    } catch (err) {
      return err;
    }
  };

  const update = async (payload: Owner): Promise<void | Error> => {
    try {
      await sql`UPDATE owners SET ${sql(from(payload),...COLUMNS)} WHERE id = ${payload.id}`;
    }catch (err) {
      return err;
    }
  };

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE owners`;
    } catch (err) {
      return err;
    }
  };

  return {
    find,
    update,
    filter,
    clear,
    findOwner,
    insert,
    delete: delete_,
  };
};
export default Store;
