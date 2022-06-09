import { Store } from ".";
import { System } from "@csea/core/system";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

describe("system", () => {
  beforeAll(async () => {
    await store.system.clear().catch((e) => {
      throw e;
    });
  });
  const system = System({ id: uuid() });
  describe("crud", () => {
    test("insert", async () => {
      const err = await store.system.insert(system);
      if (err instanceof Error) {
        throw err;
      }
    });
    test("find", async () => {
      const ret = await store.system.find({ id: system.id });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.id).toBe(system.id);
    });
    test("update", async () => {
      system.name = uuid();
      const err = await store.system.update(system);
      if (err instanceof Error) {
        throw err;
      }
      const ret = await store.system.find({ id: system.id });
      if (ret instanceof Error) {
        throw ret;
      }
      expect(ret?.name).toEqual(system.name);
    });
    test("delete", async () => {
      const ret = await store.system.delete({ id: system.id });
      if (ret instanceof Error) {
        throw ret;
      }
      const findRet = await store.system.find({ id: system.id });
      if (findRet instanceof Error) {
        throw findRet;
      }
      expect(findRet).toEqual(undefined);
    });
  });
  describe("filter", () => {
    test("empty", async () => {
      await store.system.filter({}).catch((err) => {
        throw err;
      });
    });
  });
});

