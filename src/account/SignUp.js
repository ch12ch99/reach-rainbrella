import React, { useState, useContext } from "react";
import { Button, TextField } from "@mui/material";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { config } from "../settings/firebaseConfig";
import { AuthContext, STATUS } from "../account/AuthContext";
import { addDoc } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Alert } from "@mui/material";
import "../account/SignIn.css";
import { query, where, getDocs } from "firebase/firestore";
import SignIn from "./SignIn";
import { GolfCourse } from "@mui/icons-material";
export default function SignUp() {
  const db = getFirestore();
  if (getApps().length === 0) {
    initializeApp(config);
  }
  const authContext = useContext(AuthContext);
  //在firebase預設的新增我們資料庫的
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
    account_Authority: "",
    account_Email: "",
    account_Id: 0,
    account_Name: "",
    account_Password: "",
    umbrella_Id: null,
  });
  //使用handleChange把value賦予account屬性 所以當賦值後 accout.displayName就可以在console看到 39行
  const handleChange = function (v) {
    setAccount({ ...account, [v.target.name]: v.target.value });
    console.log(account);
  };
  const [message, setMessage] = useState("");
  const [currentAccount, setCurrentAccount] = useState(false);
  const addData = async function () {
    setCurrentAccount({
      account_Email: "",
      account_Name: "",
      account_Password: "",
    });
  };
  const handleSubmit = async function () {
    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );
      console.log(res);
      if (res) {
        console.log("我有進來if");
        await updateProfile(auth.currentUser, {
          displayName: account.displayName,
        });

        const docRef = await addDoc(collection(db, "account"), {
          account_Authority: "1",
          account_Name: account.displayName,
          account_Email: account.email,
          account_Id: account.email + 1,
          account_Password: account.password,
          umbrella_Id: null,
        });

        console.log(docRef.id);
        alert("註冊成功");
        window.location.href="/SignIn";
      }
      setMessage("");
    } catch (error) {
      // setMessage("" + error + "我是66行錯誤");
    }
  };

  const changeStatus = function () {
    authContext.setStatus(STATUS.toSignIn); //設定
  };
  return (
    <div class="signUp">
      <div class="container">
        <form>
          <Alert variant="filled" severity="info">
            請先註冊
          </Alert>
          <TextField
            type="text"
            name="displayName"
            value={account.displayName}
            placeholder="姓名"
            label="姓名:"
            onChange={handleChange}
          />
          <br />
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
            註冊
          </Button>
          &nbsp;&nbsp;
          <Button variant="contained" color="secondary" onClick={changeStatus}>
            已註冊，我要登入
          </Button>
        </form>
      </div>
    </div>
  );
}
