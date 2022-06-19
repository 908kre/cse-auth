import yargs from "yargs";
import start from "./start";
import userSetAdmin from "./user.set-admin";

const root = yargs
  .scriptName("csea")
  .command(start)
  .command("user", "user", (yargs) => {
    yargs.command(userSetAdmin).demandCommand();
  });

root.demandCommand().strictCommands().help().argv;
