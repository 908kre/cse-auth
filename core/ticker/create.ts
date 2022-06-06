import { Ticker } from "@scea/core/ticker";
import { TickerStore, Logger } from "@scea/core";
import { ErrorName } from "@scea/core/error";

export type CreateFn = (req: Ticker) => Promise<Ticker | Error>;

export const CreateFn = (props: {
  store: {
    ticker: TickerStore;
    logger?: Logger;
  };
}): CreateFn => {
  return async (req: Ticker) => {
    const prev = await props.store.ticker.find(req);
    if (prev instanceof Error && prev.name !== ErrorName.NotFound) {
      return prev;
    }
    if (!(prev instanceof Error)) {
      props.store.logger?.info(
        `Ticker ${req.symbol} at ${req.ts} already exists`
      );
      return prev;
    }
    const created = await props.store.ticker.create(req);
    if (created instanceof Error) {
      return created;
    }
    props.store.logger?.info(
      `Created ticker ${created.symbol} at ${created.ts}`
    );
    return created;
  };
};