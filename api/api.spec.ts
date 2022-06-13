import { RootApi } from ".";
import { ErrorKind } from "@csea/core";
import { v4 as uuid } from "uuid";

const api = RootApi();
api.setUrl(`http://server`);


describe("system", () => {
  const id = uuid();
  test("create", async () => {
    const res = await api.system.create({
      id: id,
      name: uuid(),
      code: uuid(),
    });
    if (res instanceof Error) {

    }
  });
  test("delete", async () => {
    const res = await api.system.delete({
      id: id,
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.SystemNotFound);
    }
  });
  test("update", async () => {
    const res = await api.system.update({
      id: uuid(),
      name: uuid(),
      code: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.SystemNotFound);
    }
  });
  test("filter", async () => {
    const res = await api.system.filter({
    });
    if (res instanceof Error) {
      throw res;
    }
  });
  test("find", async () => {
    const res = await api.system.find({
      id: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.SystemNotFound);
    }
  });
});

