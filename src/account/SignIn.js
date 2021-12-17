import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { config } from "../settings/firebaseConfig";
import { AuthContext, STATUS } from "../account/AuthContext";
import { LevelContext, LEVEL } from "../account/LevelContext";
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
  const levelContext = useContext(LevelContext); //利用useContext取得authContext
  console.log(levelContext);
  console.log(authContext); //看一下登錄狀態的
  const [account, setAccount] = useState({});

  const [message, setMessage] = useState("");

  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
    console.log(account);
  };

  const handleSubmit = async function () {
    try {
      const auth = getAuth();

      const res = await signInWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      if (res) {
        console.log(auth.currentUser.displayName);
        setMessage("");

        const db = getFirestore();
        const accountconn = collection(db, "account");
        const authResult = query(
          accountconn,
          where("account_Email", "==", account.email)
        );
        const q1 = await getDocs(authResult);
        const temp = [];
        q1.forEach((doc) => {
          temp.push({
            account_Authority: doc.data().account_Authority,
          });
        });
        const userAuth = temp[0].account_Authority;
        console.log(userAuth);
        if (userAuth == 1) {
          levelContext.setLevel(LEVEL.isUser);
          authContext.setStatus(STATUS.toSignOut);
          console.log(levelContext);
        } else {
          authContext.Provider(STATUS.toSignOut);
        }
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
