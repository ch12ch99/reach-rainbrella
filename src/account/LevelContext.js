import React from "react";

export const LEVEL = {
  isUser: "user",

  isAdministrator: "administrator",
};

export const LevelContext = React.createContext({
  level: LEVEL.isUser,
  setLevel: (newLevel) => {
    this.level = newLevel;
  },
});
