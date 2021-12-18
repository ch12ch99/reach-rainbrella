import React, { useState, useContext } from "react";
import { Button, Container, TextField } from "@mui/material";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { config } from "../settings/firebaseConfig";
import { AuthContext, STATUS } from "../account/AuthContext";
import AccountAddEdit from "./AccountAddEdit";
import { addDoc } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Alert } from "@mui/material";

import "../account/SignIn.css";

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
      //console.log(res);
      if (res) {
        //console.log(res.user);
        await updateProfile(auth.currentUser, {
          displayName: account.displayName,
        });
      }
      setMessage("");
    } catch (error) {
      setMessage("" + error);

      const docRef = await addDoc(collection(db, "account"), {
        account_Authority: Boolean(account.account_Authority),
        account_Name: account.displayName,
        account_Email: account.email,
        account_Id: account.account_Id,
        account_Password: account.password,
        umbrella_Id: account.umbrella_Id,
      });
      console.log(docRef.id);
      const temp = [];
      docRef = Array.from(docRef);
      docRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({
          id: doc.id,
          account_Authority: doc.data().account_Authority,
          account_Email: doc.data().account_Email,
          account_Id: doc.data().account_Id,
          account_Name: doc.data().account_Name,
          account_Password: doc.data().account_Password,
          umbrella_Id: doc.data().umbrella_Id,
        });
      });
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
