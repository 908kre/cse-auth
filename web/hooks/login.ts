import React from "react";
import { Claims } from "@csea/core";
import useSWR, { useSWRConfig } from "swr";
import { SignInFn } from "@csea/core/auth";
import Api from "@csea/api";

type LogInInfo = {
  id: string;
  password: string;
};
export const useLogin = (props?: { onLogin?: VoidFunction }) => {
  const api = Api();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [logInInfo, setLogInInfo] = React.useState<LogInInfo>({
    id: "",
    password: "",
  });
  const [token, setToken] = React.useState<string>("");
  const [claims, setClaims] = React.useState<Claims | undefined>(undefined);

  const logIn = async (req) => {
    const token = await api.signIn(req);
    if (token instanceof Error) {
      return token;
    }
    setToken(token);
    api.setToken(token);
    const claims = await api.verify();
    if (claims instanceof Error) {
      return;
    }
    setClaims(claims);
    setIsLoggedIn(true);
    props?.onLogin?.();
  };

  return {
    isLoggedIn,
    logInInfo,
    claims,
    logIn,
    api,
  };
};
