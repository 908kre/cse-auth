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

describe("role", () => {
  const id = uuid();
  test("create", async () => {
    const res = await api.role.create({
      id: id,
      name: uuid(),
      systemId: uuid(),
      charge: uuid(),
    });
    if (res instanceof Error) {

    }
  });
  test("delete", async () => {
    const res = await api.role.delete({
      id: id,
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.SystemNotFound);
    }
  });
  test("update", async () => {
    const res = await api.role.update({
      id: uuid(),
      name: uuid(),
      systemId: uuid(),
      charge: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.RoleNotFound);
    }
  });
  test("filter", async () => {
    const res = await api.role.filter({
    });
    if (res instanceof Error) {
      throw res;
    }
  });
  test("find", async () => {
    const res = await api.role.find({
      id: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.RoleNotFound);
    }
  });
});

describe("roleUser", () => {
  const id = uuid();
  const roleId = uuid();
  test("create", async () => {
    const res = await api.roleUser.create({
      userId: id,
      roleId: uuid(),
    });
    if (res instanceof Error) {

    }
  });
  test("delete", async () => {
    const res = await api.roleUser.delete({
      userId: id,
      roleId: roleId,
    });
    if (res instanceof Error) {
      throw res
    }
  });
  test("filter", async () => {
    const res = await api.roleUser.filter({
    });
    if (res instanceof Error) {
      throw res;
    }
  });
  test("find", async () => {
    const res = await api.roleUser.find({
      userId: uuid(),
      roleId: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.RoleUserNotFound);
    }
  });
});
describe("roleGroup", () => {
  test("create", async () => {
    const res = await api.roleGroup.create({
      groupId: uuid(),
      roleId: uuid(),
      post: uuid(),
    });
    if (res instanceof Error) {
      throw res
    }
  });
  test("delete", async () => {
    const res = await api.roleGroup.delete({
      groupId: uuid(),
      roleId: uuid(),
      post: uuid(),
    });
    if (res instanceof Error) {
      throw res
    }
  });
  test("filter", async () => {
    const res = await api.roleGroup.filter({
    });
    if (res instanceof Error) {
      throw res;
    }
  });
  test("find", async () => {
    const res = await api.roleGroup.find({
      groupId: uuid(),
      roleId: uuid(),
      post: uuid(),
    });
    if (res instanceof Error) {
      expect(res.message).toBe(ErrorKind.RoleGroupNotFound);
    }
  });
});
