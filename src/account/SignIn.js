import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { config } from "../settings/firebaseConfig";
import { AuthContext, STATUS } from "../account/AuthContext";
import "../account/SignIn.css";
import { Alert } from "@mui/material";
//import { Box } from '@mui/system';

export default function SignIn() {
  if (getApps().length === 0) {
    initializeApp(config);
  }
  const authContext = useContext(AuthContext); //利用useContext取得authContext
  console.log(authContext);
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async function () {
    try {
      const auth = getAuth();

      const res = await signInWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      //console.log(res);

      if (res) {
        console.log(auth.currentUser.displayName);

        setMessage("");

        authContext.setStatus(STATUS.toSignOut);

        //updateProfile(auth.currentUser,{displayName: account.displayName});
      }
    } catch (error) {
      setMessage("" + error);
    }
  };

  const changeStatus = function () {
    authContext.setStatus(STATUS.toSignUp); //設定
    console.log(authContext); //看現在到底是什麼狀態
  };

  const superStatus = function () {
    authContext.setStatus(STATUS.toSignOut); //設定
    console.log(authContext); //看現在到底是什麼狀態
  };

  return (
    <div class="container">
      <form>
        <Alert variant="filled" severity="error">
          怎樣？不登錄就想用噶？
        </Alert>
        <TextField
          type="email"
          name="email"
          value={account.email}
          placeholder="電子郵件信箱"
          label="電子郵件信箱:"
          onChange={handleChange}
          autoComplete="email"
        />
        <br />

        <TextField
          type="password"
          name="password"
          value={account.password}
          placeholder="密碼"
          label="密碼:"
          onChange={handleChange}
          autoComplete="current-password"
        />
        <br />

        {message}
        <br />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          登入
        </Button>

        <Button variant="contained" color="secondary" onClick={changeStatus}>
          我要註冊
        </Button>
        <br />
        <br />

        <Button variant="contained" color="superqiuqiu" onClick={superStatus}>
          我是超級按鈕！
        </Button>
      </form>
    </div>
  );
}
