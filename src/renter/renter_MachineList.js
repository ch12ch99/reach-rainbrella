import React, { useEffect, useState, useContext } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { doc, getDocs } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { collection, query, where } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import AppMenu from "../ui/AppMenu";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignIn from "../account/SignIn";
import SignUp from "../account/SignUp";
<<<<<<< Updated upstream
 import "../account/SignIn.css";
 import { tableCellClasses } from '@mui/material/TableCell';
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from '@mui/material/styles';
import TableContainer from "@mui/material/TableContainer";
=======
import UmbrellaRent from "./UmbrellaRent";
import "../account/SignIn.css";
>>>>>>> Stashed changes

export default function MachineList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
  const [umbrellas, setUmbrellas] = useState([]);
  const [currentMachine, setCurrentMachine] = useState(false);
  const [currentUmbrella, setCurrentUmbrella] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function readData() {
      const querySnapshot = await getDocs(collection(db, "machine"));
      const umbrellasameid = await getDocs(query(collection(db, "umbrella"), where('machine_Id', '==', 2)));
      const temp = [];
      const temp2 = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({
          id: doc.id,
          machine_Id: doc.data().machine_Id,
          machine_Address: doc.data().machine_Address,
          machine_Spaces: doc.data().machine_Spaces
        });
      });
      umbrellasameid.forEach((doc) =>{
        console.log(doc.id, " => ", doc.data());
        temp2.push({
          id: doc.id,
          umbrella_Id: doc.data().umbrella_Id,
          umbrella_Status: doc.data().umbrella_Status
        });
      });
      console.log(temp);
      console.log(temp2);
      setMachines([...temp]);      
      setUmbrellas([...temp2]);
    }
    readData();
  }, [db]);

<<<<<<< Updated upstream
  const editData = async function (duck) {
    console.log(duck);
    setCurrentMachine({ ...machines[duck] });
    setOpen(true);
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
=======
  const rent = async function (chicken) {
    console.log(chicken);
    setCurrentUmbrella({ ...umbrellas[chicken] });
    setOpen(true);
  };

  const close = async function () {
    setOpen(false);
  };
>>>>>>> Stashed changes

  const MachineListComponent = function () {
    return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <StyledTableCell>地址</StyledTableCell>
            <StyledTableCell align="left">空間</StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machines.map((machine, duck) => (
<<<<<<< Updated upstream
            <TableRow
              key={machine.machine_Address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {machine.machine_Address}
              </TableCell>
              <TableCell align="leat">{machine.machine_Spaces}</TableCell>
              <TableCell align="right">
            </TableCell>        
            </TableRow>
=======
            <ListItem divider key={duck}>
                <ListItemText primary={"地址:" + machine.machine_Address} secondary={"空間:" + machine.machine_Spaces}
                ></ListItemText>
                {umbrellas.map((umbrella, chicken) => (
                  <Button
                  primary={umbrella.umbrella_Id}
                  onClick={() => rent(chicken)}
                  >
                </Button>
                ))}
            </ListItem>
>>>>>>> Stashed changes
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      // <div class="container">
      //   <List subheader="Machine list" aria-label="machine list">
      //     <br />
      //     {machines.map((machine, duck) => (
      //       <ListItem divider key={duck}>
      //         <Button>
      //           <ListItemText
      //             primary={"地址:" + machine.machine_Address}
      //             secondary={"空間:" + machine.machine_Spaces}
      //           ></ListItemText>
      //         </Button><br />
      //       </ListItem>
      //     ))}
      //   </List>
      // </div>
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
        <MachineListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
      <UmbrellaRent open={open} close={close} umbrella={currentUmbrella} />
    </Box>
  );
}
