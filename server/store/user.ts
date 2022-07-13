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
      SELECT cf_company, cd_person, nm_person_n, nm_mail_address1, nm_company_n, cd_dept, nm_dept_n, nm_position_n 
      FROM WXAAV788 
      WHERE cf_company='${companyCode}' 
      AND cd_person='${personCode}'
      `
      const res = await connection.execute(query)
      if (res.rows.length === 0) {
        return new Error(ErrorKind.UserNotFound)
      }
      const user = res.rows[0]
      return User({
        id: user[0].trim() + user[1].trim(),
        name: user[2],
        email: user[3],
        companyName: user[4].trim(),
        groupId: user[0].trim() + user[5].trim(),
        groupName: user[6].trim(),
        post: user[7].trim(),
      });
    } catch (e) {
      throw e
    } finally {
      if (connection) {
        try {
          await connection.close()
        } catch (e) {
          throw e
        }
      }
    }
  }

  const findLdap = async (payload: {id:string, password:string}) => {
    const { id, password } = payload
    const tlsOptions = { 'rejectUnauthorized': false }
    const client = new ldap({ url: process.env.LDAP_URL, tlsOptions });
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

    const owner = await isAdmin(payload)
    if(owner instanceof Error) {return owner}
    if(owner){
      user.admin = owner
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
      if(owner !== undefined){return true}
      return false;
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


  const clear = async (): Promise<void> => {
    try {
      await sql`TRUNCATE TABLE owners`;
    } catch (err) {
      return err;
    }
  };

  return {
    find,
    filter,
    clear,
    isAdmin,
    insert,
    delete: delete_,
  };
};
export default Store;
