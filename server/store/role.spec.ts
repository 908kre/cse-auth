import { Store } from ".";
import { Role } from "@csea/core/role";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("role", () => {
  beforeAll(async () => {
    await store.role.clear().catch((e) => {
      throw e;
    });
  });
  const role = Role({ 
    id: "test", 
    systemId: "systemId"
  });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.role.insert(role);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.role.find({ 
        id: role.id, 
        systemId: role.systemId
      });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.id).toBe(role.id);
    });
    test("update", async () => {
      role.name = uuid();
      const err = await store.role.update(role);
      if (err instanceof Error) {
        throw err;
      }
      const ret = await store.role.find({ id: role.id });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.name).toEqual(role.name);
    });
    test("delete", async () => {
      const ret = await store.role.delete({ id: role.id });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.role.find({ id: role.id });
      if (findRet instanceof Error) {
        throw findRet;
      }
      expect(findRet).toEqual(undefined);
    });
  });
  describe("filter", () => {
    test("empty", async () => {
      await store.role.filter({}).catch((err) => {
        throw err;
      });
    });
  });
});

