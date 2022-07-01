import React from "react";
import { Claims } from "@csea/core";
import useSWR, { useSWRConfig } from "swr";
import { SignInFn } from "@csea/core/auth";
import useToast from "@csea/web/hooks/toast"
import { useCookies } from "react-cookie";
import { TOKEN_KEY } from "@csea/core"
import { Api }  from "@csea/api";
import { useNavigate } from "react-router-dom";
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
export const useLogin = (props: { 
  api: Api,
  onLogin?: VoidFunction 
}):LoginHook => {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY]);
  const toast = useToast();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [logInInfo, setLogInInfo] = React.useState<LogInInfo>({
    id: "",
    password: "",
  });
  const [token, setToken] = React.useState<string>("");
  const [claims, setClaims] = React.useState<Claims | undefined>(undefined);
  React.useEffect(() => {
    if(cookies[TOKEN_KEY]){
      verify(cookies[TOKEN_KEY])
    }
  }, [])

  const verify = async (token:string) => {
    props.api.setToken(token);
    const claims = await props.api.verify();
    if (claims instanceof Error) {
      return toast.error(claims.message);
    }
    setClaims(claims);
    setIsLoggedIn(true);
  }

  const logIn = async (req) => {
    const token = await props.api.signIn(req);
    if (token instanceof Error) {
      return toast.error(token.message);
    }
    setCookie(TOKEN_KEY, token);
    setToken(token);
    await verify(token)
    props?.onLogin?.();
    toast.info('成功しました')
  };

  const logOut = () => {
    removeCookie(TOKEN_KEY);
    setClaims(undefined);
    setIsLoggedIn(false);
  };


  return {
    isLoggedIn,
    logInInfo,
    claims,
    logIn,
    logOut,
  };
};
