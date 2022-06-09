import { Store as _Store } from "@csea/server/store";
import { Lock } from "@oniku/lockfile";

export const lock = Lock({ dir: "/tmp" });
export const Store = () => _Store({
  url: process.env.DATABASE_URL || "",
});
