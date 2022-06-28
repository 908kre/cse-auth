import React from "react";
import { Claims } from "@csea/core";
import useSWR, { useSWRConfig } from "swr";
import { SignInFn } from "@csea/core/auth";
import useToast from "@csea/web/hooks/toast"
import { useCookies } from "react-cookie";


import Api from "@csea/api";

type LogInInfo = {
  id: string;
  password: string;
};
export type LoginHook = {
  isLoggedIn:boolean
  logInInfo:LogInInfo
  claims?:Claims
  logIn:(req:LogInInfo) => Promise<void|Error>
  logOut:() => void
} 
export const useLogin = (props?: { onLogin?: VoidFunction }):LoginHook => {
  const api = Api();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [logInInfo, setLogInInfo] = React.useState<LogInInfo>({
    id: "",
    password: "",
  });
  const [token, setToken] = React.useState<string>("");
  const [claims, setClaims] = React.useState<Claims | undefined>(undefined);

  React.useEffect(() => {
    if(cookies['token']){
      verify(cookies['token'])
    }
  }, [])

  const verify = async (token:string) => {
    api.setToken(token);
    const claims = await api.verify();
    if (claims instanceof Error) {
      return toast.error(claims.message);
    }
    setClaims(claims);
    setIsLoggedIn(true);
  }

  const logIn = async (req) => {
    const token = await api.signIn(req);
    if (token instanceof Error) {
      return toast.error(token.message);
    }
    setCookie("token", token);
    setToken(token);
    await verify(token)
    props?.onLogin?.();
    toast.info('成功しました')
  };

  const logOut = () => {
    removeCookie("token");
    setClaims(undefined);
    setIsLoggedIn(false);
  };


  return {
    isLoggedIn,
    logInInfo,
    claims,
    logIn,
    logOut
  };
};
