import { Argv } from "yargs";
import { App } from "@scea/server/route";

export default {
  command: "start",
  builder: (yargs: Argv) => {
    return yargs.option('port', {
      type: 'number',
      alias: 'p',
      demandOption: false,
      default:80,
      describe: 'Port'
    });
  },

  handler: (argv:{
    port:number
  }) => {
    const app = App()
    app.listen(argv.port, "0.0.0.0", (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Slave ${process.pid} Server listening at ${address}`);
    });
  },
};
