import React from "react";

export const STATUS = {
  toSignIn: 1,

  toSignOut: 2,

  toSignUp: 0,
};

export const AuthContext = React.createContext({
  status: STATUS.toSignIn,
});
