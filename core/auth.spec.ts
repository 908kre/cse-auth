import { SignIn, } from "./auth";
import { ReqKind  } from "."
import { User } from "@csea/core/user";
import { Admin } from "@csea/core/auth";
describe("auth", () => {

  const auth = {
    sign: jest.fn().mockResolvedValue("token")
  } as any

  const store = {
    user: {
      find: jest.fn()
    },
    roleUser: {
      filter: jest.fn().mockResolvedValue([])
    },
    roleGroup: {
      filter: jest.fn().mockResolvedValue([])
    },
  } as any
  const env = {
    auth,
    store,
    logger: console,
  }


  test("sign-in", async() => {
    store.user.find.mockResolvedValueOnce(
      User({
        id: "AAA111633",
        name: "higuchi fumito",
        groupId: "1490",
        post: "0000",
        admin: Admin.Owner,
      })
    )
    const signIn = SignIn({
      ...env, 
      kind: ReqKind.SignIn
    })
    await signIn.run({
      id:'aaa',
      password:1
    })

  })
})
