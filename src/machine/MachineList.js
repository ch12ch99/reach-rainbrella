import React, { useEffect, useState, useContext } from "react";
import { Fab } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { initializeApp } from "firebase/app";
import { doc, getDocs, deleteDoc } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import AppMenu from "../ui/AppMenu";
import MachineAddEdit from "./MachineAddEdit";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignIn from "../account/SignIn";
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
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function MachineList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentMachine, setCurrentMachine] = useState(false);
  const authContext = useContext(AuthContext);
  const levelContext = useContext(LevelContext);

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "machine")); // db後面是接table name 不是專案名稱
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({
          id: doc.id,
          machine_Id: doc.data().machine_Id,
          machine_Address: doc.data().machine_Address,
          machine_Spaces: doc.data().machine_Spaces
        });
        //自己設的umbrella_Id與系統給的id不同
        console.log(doc.id);
        console.log(doc.data().machine_Address);
        console.log(doc.data().machine_Spaces);
      });
      setMachines([...temp]);
      setIsLoading(false);
    }
    readData();
  }, [db, open, deleted]);

  const addData = async function () {
    setCurrentMachine({ machine_Address: "", machine_Spaces: 0 });
    setOpen(true);
  };

  const editData = async function (duck) {
    console.log(duck);
    setCurrentMachine({ ...machines[duck] });
    setOpen(true);
  };

  const deleteData = async function (id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "machine", id));
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#99BBFF',
      color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 35,
    },
  }));
  const AddData = createTheme({
    palette: {
      color: "blue",
      primary: {
        main: '#7D7DFF',
      },
    },
  });
  const MachineListComponent = function () {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <StyledTableCell><strong>地址</strong></StyledTableCell>
              <StyledTableCell align="left"><strong>空間</strong></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machines.map((machine, duck) => (
              <TableRow
                key={machine.machine_Address}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {machine.machine_Address}
                </TableCell>
                <TableCell align="leaft">{machine.machine_Spaces}</TableCell>
                <TableCell align="right">
                  {levelContext.level === "administrator" ? (
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => editData(duck)}
                    >
                      <CreateIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  {levelContext.level === "administrator" ? (
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteData(machine.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      // <List subheader="Machine list" aria-label="machine list">
      //   {machines.map((machine, duck) => (
      //     <ListItem divider key={duck}>
      //       <ListItemText
      //         primary={"地址:" + machine.machine_Address}
      //         secondary={"空間:" + machine.machine_Spaces}
      //       ></ListItemText>
      //       <IconButton
      //         edge="end"
      //         aria-label="edit"
      //         onClick={() => editData(duck)}
      //       >
      //         <CreateIcon />
      //       </IconButton>
      //       <IconButton
      //         edge="end"
      //         aria-label="delete"
      //         onClick={() => deleteData(machine.id)}
      //       >
      //         <DeleteIcon />
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
      <AppMenu /><br />
      {authContext.status === "signOut" ? ( //查看預設狀態
        <MachineListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
      {/* {!isLoading ?
                <MachineListComponent />
                :
                <CircularProgress />
              } */}
      {authContext.status === STATUS.toSignIn ? null : authContext.status ===
        STATUS.toSignUp ? null : (
        <ThemeProvider theme={AddData}>
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
        </ThemeProvider>
      )}
      <MachineAddEdit open={open} close={close} machine={currentMachine} />
    </Box>
  );
}
