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
import UmbrellaAddEdit from "./UmbrellaAddEdit";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignIn from "../account/SignIn";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
export default function UmbrellaList() {
  const authContext = useContext(AuthContext);
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [umbrellas, setUmbrellas] = useState(false);
  const [umbrellas, setUmbrellas] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentUmbrella, setCurrentUmbrella] = useState(false);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "umbrella")); // db後面是接table name 不是專案名稱
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          umbrella_Id: doc.umbrella_Id,
          umbrella_Status: doc.data().umbrella_Status,
          machine_Id: doc.data().machine_Id,
        });
        //自己設的umbrella_Id與系統給的id不同
        console.log(doc.id);
        console.log(doc.data().umbrella_Status);
      });
      setUmbrellas([...temp]);
      setIsLoading(false);
    }
    readData();
  }, [db, open, deleted]);

  const addData = async function () {
    setCurrentUmbrella({ umbrella_Status: "", machine_Id: 0 });
    setOpen(true);
  };

  const editData = async function (orange) {
    console.log(orange);
    setCurrentUmbrella({ ...umbrellas[orange] });
    setOpen(true);
  };

  const deleteData = async function (id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "umbrella", id));
      //console.log("deleted");
      setDeleted(deleted + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //借雨傘位置
  const borrowUmberlla = async function(){
    alert("借用雨傘成功");
  };

  //還雨傘
  const backUmberlla = async function(){
    alert("雨傘成功歸還");
  };

  const close = async function () {
    setOpen(false);
  };

  const UmbrellaListComponent = function () {
    return (
      <List subheader="Umbrella list" aria-label="umbrella list">
        {umbrellas.map((umbrella, orange) => (
          <ListItem divider key={orange}>
            <ListItemText
              primary={"狀態:" + umbrella.umbrella_Status}
              secondary={"機台:" + umbrella.machine_Id}
            ></ListItemText>
            {/* 修改 */}
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => editData(orange)}
            >
              <CreateIcon />
            </IconButton>
            {/* 刪除 */}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteData(umbrella.id)}
            >
              <DeleteIcon />
            </IconButton>
            {/* 借雨傘 */}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => borrowUmberlla()}
            >
              <BeachAccessIcon />
            </IconButton>
            {/* 還雨傘 */}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => backUmberlla()}
            >
              <UmbrellaIcon />
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
        <UmbrellaListComponent />
      ) : (
        <SignIn />
      )}
      {/* {!isLoading ? <UmbrellaListComponent /> : <CircularProgress />} */}
      {authContext.status === STATUS.toSignIn ? (
        <Box></Box>
      ) : (
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
      <UmbrellaAddEdit open={open} close={close} umbrella={currentUmbrella} />
    </Box>
  );
}
