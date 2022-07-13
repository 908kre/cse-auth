import { Store } from ".";
import { Maintainer } from "@csea/core/maintainer";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("maintainer", () => {
  beforeAll(async () => {
    await store.maintainer.clear().catch((e) => {
      throw e;
    });
  });
  const maintainer = Maintainer({ 
    id: uuid(),
    systemId: uuid(),
  });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.maintainer.insert(maintainer);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.maintainer.find({ 
        id: maintainer.id,
        systemId: maintainer.systemId,
      });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.id).toBe(maintainer.id);
    });
    test("delete", async () => {
      const ret = await store.maintainer.delete({
        id:maintainer.id,
        systemId:maintainer.systemId,
      });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.maintainer.find({ 
        id: maintainer.id, 
        systemId: maintainer.systemId,
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
