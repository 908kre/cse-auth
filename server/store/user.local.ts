import { Row, Sql } from "postgres";
import { first } from "lodash";
import { UserStore } from "@csea/core";
import { User, Owner } from "@csea/core/user";
import ErrorKind from "@csea/core/error";

const COLUMNS = [
  "id",
] as const

const to = (r: Row): Owner => {
  return Owner({
    id: r.id,
  });
};

const from = (r: Owner): Row => {
  return {
    id: r.id,
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
        admin: true
      })
    }else if(id === "test" && password === "test"){
      return User({
        id: "AAA110800",
        name: "yao",
        groupId: "1490",
        post: "0000",
        admin: false,
      })
    };
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

  const isAdmin = async (payload: {id:string}) => {
    const { id } = payload
    try {
      const rows = await sql`SELECT * FROM owners WHERE id=${id}`;
      const owner = first(rows.map(to))
      if(owner !== undefined){ return true }
      return false;
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

  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE owners`;
    } catch (err) {
      return err;
    }
  };

  const update = async (payload: { id: string }) => {
    return User({
      id: "AAA111633",
      name: "higuchi fumito",
      groupId: "1490",
      post: "0000",
      admin: true,
    });
  };
  return {
    find,
    update,
    filter,
    insert,
    delete: delete_,
    clear,
    isAdmin
  };
};
export default Store;

