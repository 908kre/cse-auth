import { Store as _Store } from "@csea/server/store";
import { Lock } from "@oniku/lockfile";
import { JwtAuth } from "./auth";

export const lock = Lock({ dir: "/tmp" });
export const store = _Store({
  url: process.env.DATABASE_URL || "",
});

const secret = Math.random().toString(32).substring(2);
export const Auth = (request) =>
  JwtAuth({ token: request.headers["x-auth-token"], secret });
