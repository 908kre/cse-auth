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
  const roleUser = RoleUser({ userId: uuid(), roleId: uuid() });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.roleUser.insert(roleUser);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.roleUser.find({ 
        userId: roleUser.userId,
        roleId: roleUser.roleId,
      });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.userId).toBe(roleUser.userId);
    });
    test("delete", async () => {
      const ret = await store.roleUser.delete({ userId: roleUser.userId, roleId: roleUser.roleId });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.roleUser.find({ userId: roleUser.userId, roleId: roleUser.roleId });
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
      await store.roleUser.filter({ userId: roleUser.userId }).catch((err) => {
        throw err;
      });
    });
  });
});

