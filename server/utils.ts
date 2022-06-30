
import cookie from "cookie"
import { FastifyRequest } from "fastify"
import { TOKEN_KEY } from "@csea/core"

export const getToken = (req: FastifyRequest) => {
  return cookie.parse(req.headers.cookie ?? "")[TOKEN_KEY]
}
