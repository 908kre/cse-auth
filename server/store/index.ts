import postgres from "postgres";
import SystemStore from "./system";
import RoleStore from "./role";
import RoleUserStore from "./roleUser";
import RoleGroupStore from "./roleGroup";
import UserStore from "./user";
import MaintainerStore from "./maintainer";
import UserStoreLocal from "./user.local";

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
  const roleUser = RoleUserStore(sql);
  const roleGroup = RoleGroupStore(sql);
  const maintainer = MaintainerStore(sql);
  const user = (() => {
    if(process.env.LDAP_URL) {
      return UserStore(sql);
    }else{
      return UserStoreLocal(sql)
    }
  })()
  return {
    system,
    role,
    roleUser,
    roleGroup,
    maintainer,
    user,
    close,
  };
};
export default Store;
