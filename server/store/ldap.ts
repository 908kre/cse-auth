import ldap from "ldapjs-client"

export type Ldap = {
  find: (payload: { id: string, password?: string }) => Promise<void| Error>;
};

export const Store = ():Ldap => {
  const find = async (payload:{id:string, password?:string}) => {
    const client = new ldap({ url: "ldap://ldap-test.global.canon.co.jp:389" });
    try {
      const c = await client.bind('cn=wjjz041,ou=System,o=Canon', 'Fpalm041');
      const options = {
      };
      const entries = await client.search(`uid="111633",o=AAA,ou=People,o=Canon`, options);
      console.log(entries[0])
      await client.unbind()
    } catch (err) {
      await client.unbind()
    }
  }
  return {
    find,
  }
}
