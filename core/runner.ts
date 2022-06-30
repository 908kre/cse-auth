import { performance } from 'perf_hooks';
import { Logger, ReqFn, ReqKind, ReqStatus, ReqInput , ReqOutput } from '.';

export type Runner = <K extends ReqKind>(reqFn: ReqFn<K>, payload: (ReqInput & { kind: K })['payload']) => Promise<(ReqOutput & { kind: K })['payload']>
export const Runner = (props: { logger: Logger }) => {
  const { logger } = props;
  return async <K extends ReqKind>(reqFn: ReqFn<K>, payload: (ReqInput & { kind: K })['payload']) => {
    const { kind } = reqFn
    logger.info({
      status: ReqStatus.Running,
      kind,
    });
    const startTime = performance.now();
    const res = await reqFn.run(payload);
    const endTime = performance.now();
    const elapsed = endTime - startTime;
    if (res instanceof Error) {
      const msg = {
        status: ReqStatus.Failed,
        kind,
        reason: res.toString(),
        elapsed,
        payload,
        stack: res.stack,
      };
      logger.error(msg);
    } else {
      logger.info({
        status: ReqStatus.Done,
        kind,
        elapsed,
        payload,
      });
    }
    return res;
  };
};
