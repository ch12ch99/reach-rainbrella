import React from "react";

export const LEVEL = {
  isUser: "user",

  isAdministrator: "administrator",
};

export const LevelContext = React.createContext({
  status: LEVEL.isAdministrator,
  setStatus: (newStatus) => {
    this.status = newStatus;
  },
});
