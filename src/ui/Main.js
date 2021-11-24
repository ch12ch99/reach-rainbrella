import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AppMenu from "./AppMenu";
import SignUp from "../account/SignUp";
import SignIn from "../account/SignIn";
import SignOut from "../account/SignOut";

export default function Main() {
  const [status, setStatus] = useState("signIn");
  return (
    <div>
      <AppMenu />
      {status === "signUp" ? (
        <SignUp setStatus={setStatus} />
      ) : status === "signIn" ? (
        <SignIn setStatus={setStatus} />
      ) : (
        <SignOut setStatus={setStatus} />
      )}
    </div>
  );
}
