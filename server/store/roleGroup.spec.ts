import { Store } from ".";
import { RoleGroup } from "@csea/core/roleGroup";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("roleGroup", () => {
  beforeAll(async () => {
    await store.roleGroup.clear().catch((e) => {
      throw e;
    });
  });
  const roleGroup = RoleGroup({ 
    groupId: uuid(),
    roleId: uuid(),
    post: uuid()
  });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.roleGroup.insert(roleGroup);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.roleGroup.find({ 
        groupId: roleGroup.groupId, 
        roleId: roleGroup.roleId,
        post: roleGroup.post
      });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.groupId).toBe(roleGroup.groupId);
    });
    test("delete", async () => {
      const ret = await store.roleGroup.delete({
        groupId:roleGroup.groupId,
        roleId:roleGroup.roleId,
        post:roleGroup.post,
      });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.roleGroup.find({ 
        groupId: roleGroup.groupId, 
        roleId: roleGroup.roleId,
        post: roleGroup.post
      });
      if (findRet instanceof Error) {
        throw findRet;
      }
      expect(findRet).toEqual(undefined);
    });
  });
  describe("filter", () => {
    test("empty", async () => {
      await store.roleGroup.filter({}).catch((err) => {
        throw err;
      });
    });
  });
});

