import React from "react";

export const useLogin = (props?: {}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return {
    isLoggedIn,
    userId,
    password,
    setPassword,
  };
};
