import { Store } from ".";
import { Owner } from "@csea/core/user";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("role", () => {
  beforeAll(async () => {
    await store.user.clear().catch((e) => {
      throw e;
    });
  });
  const owner = Owner({ 
    id: "test", 
  });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.user.insert(owner);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("is-admin", async () => {
      const err = await store.user.isAdmin({id: owner.id});
      if (err instanceof Error) {
        throw err;
      }
      expect(err).toEqual(true);
    });
    test("delete", async () => {
      const ret = await store.user.delete({ id: owner.id });
      if (ret instanceof Error) {
        throw ret;
      }
      const isAdmin = await store.user.isAdmin({ id: owner.id });
      if (isAdmin instanceof Error) {
        throw isAdmin;
      }
      expect(isAdmin).toEqual(false);
    });
    test("empty", async () => {
      await store.user.filter({}).catch((err) => {
        throw err;
      });
    });
  });
});

