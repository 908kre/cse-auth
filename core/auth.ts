import {
  Lock,
  ErrorKind,
  Claims,
  Store,
  Auth,
  Crypt,
} from ".";

export type SignInPayload = {
  id: string;
  password: string;
};

export const signIn = async (args: {
  auth: Auth;
  crypt: Crypt;
  store: Store;
  payload: SignInPayload;
}): Promise<string | Error> => {
  const { store, payload, auth, crypt } = args;

  const claims: Claims = {
    exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60),
    userId: "",
  };
  return await auth.sign(claims);

};
