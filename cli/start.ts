import { Argv } from "yargs";
import { GmoCoin } from "@scea/server/gmo-coin";
import { TickerStore } from "@scea/server/ticker-store";
import { Postgresql } from "@scea/server/postgresql";
import { CreateFn } from "@scea/core/ticker/create";
import pino from "pino";

export default {
  command: "start",
  builder: (yargs: Argv) => {
    return yargs;
  },
  handler: () => {
    const sql = Postgresql();
    const exchange = GmoCoin();
    const logger = pino();
    const store = {
      ticker: TickerStore(sql),
    };
    exchange.subscribe(CreateFn({ store }));
  },
};
