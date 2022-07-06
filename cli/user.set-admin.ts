import { Argv } from "yargs";
import { Store } from "@csea/server/store";
import { Lock } from "@oniku/lockfile";
import { JwtAuth } from "@csea/server/auth";
import { SetAdminFn } from "@csea/core/user/set-admin";

export default {
  command: "set-admin",
  builder: (yargs: Argv) => {
    return yargs
      .option("id", {
        type: "string",
        demandOption: true,
        describe: "User ID",
      })
      .option("admin", {
        type: "boolean",
        demandOption: true,
        describe: "Admin status",
        default: true,
      });
  },

  handler: async (argv: { id: string }) => {
    const store = Store({ url: process.env.DATABASE_URL || "" });
    const fn = SetAdminFn({
      store,
    });
    const err = await fn(argv);
    if (err instanceof Error) {
      throw err;
    }
  },
};
