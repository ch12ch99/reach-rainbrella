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
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import SignUp from "../account/SignUp";
import { tableCellClasses } from '@mui/material/TableCell';
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
import { LevelContext } from "../account/LevelContext";

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
  const levelContext = useContext(LevelContext);
  console.log(authContext.status);
  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "umbrella")); // db後面是接table name 不是專案名稱
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          umbrella_Id: doc.data().umbrella_Id,
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
  const borrowUmberlla = async function () {
    alert("借用雨傘成功");
  };

  //還雨傘
  const backUmberlla = async function () {
    alert("雨傘成功歸還");
  };

  const close = async function () {
    setOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#59FFFF',
      color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 30,
    },
  }));


  const UmbrellaListComponent = function () {
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>狀態</StyledTableCell>
            <StyledTableCell align="center">機台</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {umbrellas.map((umbrella, orange) => (
            <TableRow
              key={umbrella.umbrella_Status}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {umbrella.umbrella_Id}
              </TableCell>
              <TableCell component="th" scope="row">
                {umbrella.umbrella_Status}
              </TableCell>
              <TableCell align="center">{umbrella.machine_Id}</TableCell>
              <TableCell align="right">
              {/* 修改 */}
              {levelContext.level === "administrator" ? ( 
              <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => editData(orange)}
            >
              <CreateIcon />
            </IconButton>
              ):(
                ""
              )}
            {/* 刪除 */}
              {levelContext.level === "administrator" ? ( 
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteData(umbrella.id)}
            >
              <DeleteIcon />
            </IconButton>
              ):(
                ""
              )}
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
            </TableCell>       
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      // <List subheader="Umbrella list" aria-label="umbrella list">
      //   {umbrellas.map((umbrella, orange) => (
      //     <ListItem divider key={orange}>
      //       <ListItemText
      //         primary={"狀態:" + umbrella.umbrella_Status}
      //         secondary={"機台:" + umbrella.machine_Id}
      //       ></ListItemText>
      //       {/* 修改 */}
      //       <IconButton
      //         edge="end"
      //         aria-label="edit"
      //         onClick={() => editData(orange)}
      //       >
      //         <CreateIcon />
      //       </IconButton>
      //       {/* 刪除 */}
      //       <IconButton
      //         edge="end"
      //         aria-label="delete"
      //         onClick={() => deleteData(umbrella.id)}
      //       >
      //         <DeleteIcon />
      //       </IconButton>
      //       {/* 借雨傘 */}
      //       <IconButton
      //         edge="end"
      //         aria-label="delete"
      //         onClick={() => borrowUmberlla()}
      //       >
      //         <BeachAccessIcon />
      //       </IconButton>
      //       {/* 還雨傘 */}
      //       <IconButton
      //         edge="end"
      //         aria-label="delete"
      //         onClick={() => backUmberlla()}
      //       >
      //         <UmbrellaIcon />
      //       </IconButton>
      //     </ListItem>
      //   ))}
      // </List>
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
      <AppMenu /><br/>
      {authContext.status === "signOut" ? ( //查看預設狀態
        <UmbrellaListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
      {/* {!isLoading ? <UmbrellaListComponent /> : <CircularProgress />} */}
      {authContext.status === STATUS.toSignIn ? null : authContext.status ===
        STATUS.toSignUp ? null : (
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
