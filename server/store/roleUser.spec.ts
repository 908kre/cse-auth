import { Store } from ".";
import { RoleUser } from "@csea/core/roleUser";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("roleUser", () => {
  beforeAll(async () => {
    await store.roleUser.clear().catch((e) => {
      throw e;
    });
  });
  const roleUser = RoleUser({ id: uuid() });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.roleUser.insert(roleUser);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.roleUser.find({ id: roleUser.id });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.id).toBe(roleUser.id);
    });
    test("update", async () => {
      roleUser.roleId = uuid();
      const err = await store.roleUser.update(roleUser);
      if (err instanceof Error) {
        throw err;
      }
      const ret = await store.roleUser.find({ id: roleUser.id });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.roleId).toEqual(roleUser.roleId);
    });
    test("delete", async () => {
      const ret = await store.roleUser.delete({ id: roleUser.id });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.roleUser.find({ id: roleUser.id });
      if (findRet instanceof Error) {
        throw findRet;
      }
      expect(findRet).toEqual(undefined);
    });
  });
  describe("filter", () => {
    test("empty", async () => {
      await store.roleUser.filter({}).catch((err) => {
        throw err;
      });
    });
  });
});

