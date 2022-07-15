import { Store } from ".";
import { ErrorKind } from "@csea/core";
import { Owner } from "@csea/core/user";
import { v4 as uuid } from "uuid";

const store = Store({ url: process.env.DATABASE_URL || "" });

afterAll(async () => {
  await store.close().catch((e) => {
    throw e;
  });
});

// test('oracle', async () => { 
//   const err = await store.user.findGcip({ id: 'AXA097046' });
//   console.log(err)
//   if (err instanceof Error) {
//     throw err;
//   }
// })

// test('ldap', async () => {
//   const err = await store.user.findLdap({ id: 'AXA097046',password: 'smafa_test2'  });
//   if(err instanceof Error){
//     throw err
//   }
// })
// test('ldap-err', async () => {
//   const err = await store.user.findLdap({ id: 'AXA097046',password: 'smafa'  });
//   if(err instanceof Error){
//     expect(err.message).toBe(ErrorKind.InvalidIdOrPassword);
//   }
// })

// describe("user", () => {
//   beforeAll(async () => {
//     await store.user.clear().catch((e) => {
//       throw e;
//     });
//   });
//   const owner = Owner({ 
//     id: "AXA097046", 
//   });
//   describe("crud", () => {
//     test("insert", async () => {
//       const err = await store.user.insert(owner);
//       if (err instanceof Error) {
//         throw err;
//       }
//     });
//     test("is-admin", async () => {
//       const err = await store.user.isAdmin({id: owner.id});
//       if (err instanceof Error || err === undefined) {
//         throw err;
//       }
//       expect(err).toEqual(true);
//     });
//     test("find", async () => {
//       const err = await store.user.find({id: "AXA097046", password:"smafa_test2"});
//       if (err instanceof Error) {
//         throw err;
//       }
//       expect(err.id).toEqual("AXA097046");
//     });
//     test("find-err", async () => {
//       const err = await store.user.find({id: "AXA097046", password:"smafa"});
//       if (err instanceof Error) {
//         expect(err.message).toBe(ErrorKind.InvalidIdOrPassword);
//       }
//     });
//     test("delete", async () => {
//       const ret = await store.user.delete({ id: owner.id });
//       if (ret instanceof Error) {
//         throw ret;
//       }
//       const err = await store.user.isAdmin({ id: owner.id });
//       if (err instanceof Error) {
//         throw err;
//       }
//       expect(err).toEqual(false);
//     });
//     test("empty", async () => {
//       await store.user.filter({}).catch((err) => {
//         throw err;
//       });
//     });
//   });
// });

