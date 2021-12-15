import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { config } from "../settings/firebaseConfig";
import { AuthContext, STATUS } from "../account/AuthContext";
import "../account/SignIn.css";
import { Alert } from "@mui/material";
//import { Box } from '@mui/system';
import { collection, getDocs, getFirestore, query } from "@firebase/firestore";
import { where } from "@firebase/firestore";
export default function SignIn() {
  if (getApps().length === 0) {
    initializeApp(config);
  }
  const authContext = useContext(AuthContext); //利用useContext取得authContext
  console.log(authContext); //看一下登錄狀態的
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

      const db = getFirestore();
      const accountconn = collection(db, "account");
      const authResult = query(accountconn, where("account_Email", "==",account.email));
      const q1 = await getDocs(authResult);
      q1.forEach((doc) => {
        console.log(doc.data());
        console.log(doc.data().account_Authority);
    });
      console.log(q1);
      console.log(authResult);
      //console.log(q1.);


      if (res) {
        console.log(auth.currentUser.displayName);

        setMessage("");

        authContext.setStatus(STATUS.toSignOut);

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
    <div class="sidenav">
      <div class="container">
        <form>
          <Alert variant="filled" severity="error">
            請先登入
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
          &nbsp;&nbsp;
          <Button variant="contained" color="warning" onClick={changeStatus}>
            註冊
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="error" onClick={superStatus}>
            管理者
          </Button>
        </form>
      </div>
    </div>
  );
}
