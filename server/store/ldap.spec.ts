import { Store } from '@csea/server/store/ldap'

describe("ldap", () => {
  const store = Store()
  test("find-true", async () => {
    const rows = await store.find({id: "AAA111633", password: "cipdev"})
    if(rows instanceof Error){
      throw rows
    }
  });
});
