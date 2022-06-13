import postgres from "postgres";
import SystemStore from "./system";
import RoleStore from "./role";

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
  const role = RoleStore(sql);
  return {
    system,
    role,
    close,
  };
};
export default Store;
