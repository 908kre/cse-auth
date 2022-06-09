import postgres from "postgres";
import SystemStore from "./system";

export const Store = (args: { 
  url: string; 
  max?: number,
}) => {
  const sql = postgres(args.url, {
    max: args.max || 5,
  });
  const close = async () => {
    await sql.end({ timeout: 5 });
  };
  const system = SystemStore(sql);
  return {
    system,
    close,
  };
};
export default Store;
