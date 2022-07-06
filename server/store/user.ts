import { Row, Sql } from "postgres";
import { first } from "lodash";
import { UserStore } from "@csea/core";
import { User, Owner } from "@csea/core/user";
import ErrorKind from "@csea/core/error";
import ldap from "ldapjs-client"
import oracledb from "oracledb";

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
  const findGcip = async (payload: {id: string}) => {
    const { id } = payload
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectionString: process.env.ORACLE_CONFIG,
      })
      const companyCode: string = id.slice(0,3).toUpperCase()
      const personCode: string = id.slice(3,10)
      const query = `
      SELECT cf_company, cd_person, nm_person_n, cd_dept, nm_position_n 
      FROM WXAAV788 
      WHERE cf_company='${companyCode}' 
      AND cd_person='${personCode}'
      `
      const res = await connection.execute(query)
      if (res.rows.length === 0) {
        return new Error(ErrorKind.UserNotFound)
      }
      return User({
        id: res.rows[0][0].trim() + res.rows[0][1].trim(),
        name: res.rows[0][2],
        groupId: res.rows[0][3].trim(),
        post: res.rows[0][4].trim(),
        admin: false,
      });
    } catch (e) {
      console.log(e.message)
      throw e
    } finally {
      if (connection) {
        try {
          await connection.close()
        } catch (e) {
          console.log(e.message)
          throw e
        }
      }
    }
  }

  const findLdap = async (payload: {id:string, password:string}) => {
    const { id, password } = payload
    const tlsOptions = { 'rejectUnauthorized': false }
    const client = new ldap({ url: "ldaps://172.18.209.227:636", tlsOptions });
    try {
      const c = await client.bind(`cn=${id},ou=People,dc=canon,dc=jp`, password);
      const options = {};
      const entries = await client.search(`cn=${id},ou=People,dc=canon,dc=jp`, options);
      await client.unbind()
    } catch (err) {
      await client.unbind()
      if (err instanceof Error) { return new Error(ErrorKind.InvalidIdOrPassword) }
    }
  };

  const find = async (payload: { id: string; password: string }) => {
    const { id, password } = payload
    const err = await findLdap(payload)
    if(err instanceof Error) {return err}

    const user = await findGcip(payload)
    if(user instanceof Error) {return user}

    const admin = await isAdmin(payload)
    if(admin instanceof Error) {return admin}
    if(admin === true){
      user.admin = true
    }
    return user
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
      let rows = [];
      rows = await sql`SELECT * FROM owners WHERE id=${id}`;
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
    findGcip,
    findLdap,
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
