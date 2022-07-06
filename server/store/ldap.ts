import ldap from "ldapjs-client"

export type Ldap = {
  find: (payload: { id: string, password?: string }) => Promise<void| Error>;
};

export const Store = ():Ldap => {
  const find = async (payload:{id:string, password?:string}) => {
    const tlsOptions = { 'rejectUnauthorized': false }
    const client = new ldap({ url: "ldaps://172.18.209.227:636", tlsOptions });
    try {
      const c = await client.bind('cn=AXA097046,ou=People,dc=canon,dc=jp', 'smafa_test2');
      const options = {};
      const entries = await client.search(`cn=AXA097046,ou=People,dc=canon,dc=jp`, options);
      await client.unbind()
    } catch (err) {
      await client.unbind()
    }
  }
  return {
    find,
  }
}
