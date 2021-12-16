import React from "react";

export const STATUS = {
  toSignIn: "signIn",

  toSignOut: "signOut",

  toSignUp: "signUp",
};

export const LEVEL = {
  isUser: "user",
  isAdministrator: "administrator",
};

export const AuthContext = React.createContext({
  status: STATUS.toSignIn,
  setStatus: (newStatus) => {
    this.status = newStatus;
  },
});

export const LevelContext = React.createContext({
  level: LEVEL.isUser,
  setLevel: (newLevel) => {
    this.level = newLevel;
  },
});
/*
status及setStatus在provider會被覆蓋
status為toSignIn 已註冊，將要登入
status為toSignOut 已登入，將要登出  
status為toSignUp 未註冊，將要註冊  
*/
