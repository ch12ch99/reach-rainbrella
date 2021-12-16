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
import UmbrellaRent from "./UmbrellaRent";
import "../account/SignIn.css";
import { tableCellClasses } from "@mui/material/TableCell";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";

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
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({
          id: doc.id,
          machine_Id: doc.data().machine_Id,
          machine_Address: doc.data().machine_Address,
          machine_Spaces: doc.data().machine_Spaces,
        });
      });
      console.log(temp);
      setMachines([...temp]);
      const umbrellasameid = await getDocs(
        query(collection(db, "umbrella"), where("machine_Id", "==", 2))
      );
      const temp2 = [];
      umbrellasameid.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp2.push({
          id: doc.id,
          umbrella_Id: doc.data().umbrella_Id,
          umbrella_Status: doc.data().umbrella_Status,
        });
      });
      console.log(temp2);
      setUmbrellas([...temp2]);
    }
    readData();
  }, [db]);

  const rent = async function (chicken) {
    console.log(chicken);
    setCurrentUmbrella({ ...umbrellas[chicken] });
    setOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#59FFFF",
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 30,
    },
  }));

  const close = async function () {
    setOpen(false);
  };

  const MachineListComponent = function () {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>地址</StyledTableCell>
              <StyledTableCell align="left">空間</StyledTableCell>
              <StyledTableCell align="left">機台雨傘</StyledTableCell>
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
                <TableCell align="leat">{machine.machine_Spaces}</TableCell>

                {umbrellas.map((umbrella, chicken) => (
                  <TableCell align="right">
                    <Button
                      variant="primary"
                      value={umbrella.umbrella_Id}
                      onClick={() => rent(chicken)}
                    >
                      {umbrella.umbrella_Id}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
              // <ListItem divider key={duck}>
              //     <ListItemText primary={"地址:" + machine.machine_Address} secondary={"空間:" + machine.machine_Spaces}
              //     ></ListItemText>
              //     {umbrellas.map((umbrella, chicken) => (
              //       <Button
              //       variant="primary"
              //       value={umbrella.umbrella_Id}
              //       onClick={() => rent(chicken)}
              //       >
              //     </Button>
              //     ))}
              // </ListItem>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <br />
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
