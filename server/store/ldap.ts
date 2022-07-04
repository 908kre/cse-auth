import ldap from "ldapjs-client"

export type Ldap = {
  find: (payload: { id: string, password?: string }) => Promise<void| Error>;
};

export const Store = ():Ldap => {
  const find = async (payload:{id:string, password?:string}) => {
    const client = new ldap({ url: "ldap://192.168.56.121:636" });
    try {
      const c = await client.bind('cn=AAA111111,ou=People,dc=canon,dc=jp', 'smafa_test1');
      const options = {
      };
      // const entries = await client.search(`uid="AAA111633",o=AAA,ou=People,o=Canon`, options);
      // console.log(entries)
      // await client.unbind()
    } catch (err) {
      console.log(err)
      await client.unbind()
    }
  }
  return {
    find,
  }
}
