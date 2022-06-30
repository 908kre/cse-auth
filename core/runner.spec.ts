import { Runner } from "./runner";
import { ReqKind  } from "."
describe("runner", () => {
  const run = Runner({
    logger: console
  })
  test("run", async() => {
    const reqFn = {
      kind: ReqKind.Test,
      run: async (req) => {
        return "test"
      }
    }
    const res = await run(reqFn, {"key": "value"})
    expect(res).toBe("test")
  })
})
