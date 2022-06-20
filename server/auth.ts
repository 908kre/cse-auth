import jwt from "jsonwebtoken";
import { Claims, ErrorKind } from "@csea/core";

export const JwtAuth = (args: { secret: string }) => {
  const { secret } = args;
  const sign = (claims: Claims): Promise<string | Error> => {
    return new Promise((resolve) => {
      jwt.sign(
        claims,
        secret,
        { algorithm: "HS256", noTimestamp: true },
        function (err, token) {
          if (err) {
            return resolve(err);
          }
          return resolve(token);
        }
      );
    });
  };
  const verify = async (token?: string): Promise<Claims | Error> => {
    return new Promise((resolve, reject) => {
      if (token === undefined) {
        return resolve(new Error(ErrorKind.TokenNotFound));
      }
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return resolve(new Error(ErrorKind.InvalidToken));
        }
        return resolve(decoded);
      });
    });
  };
  return {
    verify,
    sign,
  };
};
