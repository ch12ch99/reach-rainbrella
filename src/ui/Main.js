import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AppMenu from "./AppMenu";
import SignUp from "../account/SignUp";
import SignIn from "../account/SignIn";
import SignOut from "../account/SignOut";
import { AuthContext, STATUS } from '../account/AuthContext';

export default function Main() {
  //const [status, setStatus] = useState("signIn"); //設定預設狀態
  const authContext = useContext(AuthContext); // 取得AuthContext裡的值
  console.log(authContext); //查看預設狀態


  return (
    <div>
      <h4>請先登錄</h4>
      {(authContext.status) === "signUp" ? (  //查看預設狀態
        <SignUp />
      ) : (authContext.status) === "signIn" ? (
        <SignIn />
      ) : (
        <SignOut />
      )}
      {/* <AppMenu /> */}
    </div>
  );
}
