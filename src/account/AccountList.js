import React, { useEffect, useState, useContext } from "react";
import { Fab } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { initializeApp } from "firebase/app";
import { doc, getDocs, deleteDoc } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import AppMenu from "../ui/AppMenu";
import AccountAddEdit from "./AccountAddEdit";
import SignIn from "./SignIn";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignUp from "../account/SignUp";

export default function AccountList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentAccount, setCurrentAccount] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const authContext = useContext(AuthContext); //利用useContext hook取得AuthContext裡的值

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "account")); // db後面是接table name 不是專案名稱
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          account_Authority: doc.data().account_Authority,
          account_Email: doc.data().account_Email,
          account_Id: doc.data().account_Id,
          account_Name: doc.data().account_Name,
          account_Password: doc.data().account_Password,
          account_Phone: doc.data().account_Phone,
          umbrella_Id: doc.data().umbrella_Id,
        });
        //自己設的_Id與系統給的id不同
        console.log(doc.id);
        console.log(doc.data().account_Authority);
      });
      setAccounts([...temp]);
      setIsLoading(false);
    }
    readData();
  }, [db, open, deleted]);

  const addData = async function () {
    setCurrentAccount({
      account_Authority: "",
      account_Email: "",
      account_Id: "",
      account_Name: "",
      account_Password: "",
      account_Phone: "",
      umbrella_Id: "",
    });
    setOpen(true);
  };

  const editData = async function (red) {
    console.log(red);
    setCurrentAccount({ ...accounts[red] });
    setOpen(true);
  };

  const deleteData = async function (id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "account", id));
      //console.log("deleted");
      setDeleted(deleted + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const close = async function () {
    setOpen(false);
  };

  //      const columns: GridColDef[] = [
  //        { field: "id", headerName: "帳號名稱", width: 100 },
  //        { field: "firstName", headerName: "E-mail", width: 200 },
  //        { field: "lastName", headerName: "Id", width: 200 },
  //        { field: "age", headerName: "Password", width: 90 },
  //        { field: "age", headerName: "雨傘編號", width: 90 },
  //        { field: "age", headerName: "是否為管理者", width: 90 },
  //        { field: "age", headerName: "編輯", width: 90 },
  //        { field: "age", headerName: "刪除", width: 90 }
  //      ];
  const AccountListComponent = function () {
    return (
      <List subheader="Account list" aria-label="account list">
        {accounts.map((account, red) => (
          <ListItem divider key={red}>
            <ListItemText
              primary={"帳號名稱 : " + account.account_Name}
            ></ListItemText>
            <ListItemText
              secondary={"E-mail : " + account.account_Email}
            ></ListItemText>
            <ListItemText
              secondary={"Id : " + account.account_Id}
            ></ListItemText>
            <ListItemText
              secondary={"Password : " + account.account_Password}
            ></ListItemText>
            <ListItemText
              secondary={"雨傘編號 : " + account.umbrella_Id}
            ></ListItemText>
            <ListItemText
              secondary={"是否為管理者 : " + account.account_Authority}
            ></ListItemText>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => editData(red)}
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteData(account.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Box
      sx={{
        paddingLeft: "3vw",
        width: "90vw",
        height: "100vh",
        backgroundColor: "background.paper",
        color: "black",
        textAlign: "left",
      }}
    >
      <AppMenu />
      {authContext.status === "signOut" ? ( //查看預設狀態
        <AccountListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
      {/* {!isLoading ?
                <AccountListComponent />
                :
                <CircularProgress />
              } */}
      {authContext.status === STATUS.toSignIn || STATUS.toSignUp ? null : (
        <Fab
          color="primary"
          aria-label="新增"
          onClick={addData}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(8),
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <AccountAddEdit open={open} close={close} account={currentAccount} />
    </Box>
  );
}
