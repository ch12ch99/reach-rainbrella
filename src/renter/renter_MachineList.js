import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { doc, setDoc, getDocs } from "@firebase/firestore";
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

export default function MachineList(props) {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [account, setAccount] = useState({ account_Status:"", machine_Id: 0 });
  useEffect(() => setAccount({ ...props.account }), [props.account]);
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentMachine, setCurrentMachine] = useState(false);
  const [currentUmbrella, setCurrentUmbrella] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function readData() {
      const querySnapshot = await getDocs(collection(db, "machine"));
      const temp = [];
      let u_ids = [];
      setMachines([]);
      
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("machine:", doc.id, " => ", doc.data());
        u_ids.push(doc.data().machine_Id);
        
        const umbrellasameid = await getDocs(
          query(collection(db, "umbrella"), where("machine_Id", "==",doc.data().machine_Id))
        );
        const temp2 = [];
        umbrellasameid.forEach((doc) => {
          console.log("umbrella", doc.id, " => ", doc.data());
          temp2.push({
            id: doc.id,
            umbrella_Id: doc.data().umbrella_Id,
            umbrella_Status: doc.data().umbrella_Status,
          });
        });
        const data = {
          id: doc.id,
          machine_Id: doc.data().machine_Id,
          machine_Address: doc.data().machine_Address,
          machine_Spaces: doc.data().machine_Spaces,
          umbrellas: [...temp2]
        }
        setMachines((currentMachine)=>[...currentMachine, data]);
      });
    }
    readData();
  }, [db]);

  const rent = async function (rain) {
  
    console.log ("in rent:");
    console.log(rain);
    const handleChange = function (e) {
      setAccount({ ...account, [e.target.name]: e.target.value })
    }
    const rentumbrella = await setDoc(doc(db, "account", account.id), {
        account_Id: doc.data().account_Id,
        umbrella_Id: account.umbrella_Id
    });
//    setCurrentUmbrella({ ...umbrellas[rain] });
    setOpen(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#99BBFF",
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
              <StyledTableCell><strong>地址</strong></StyledTableCell>
              <StyledTableCell align="left"><strong>空間</strong></StyledTableCell>
              <StyledTableCell align="left"><strong>機台雨傘</strong></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {console.log("machine in view:")}{console.log(machines)}
            {machines.map((machine, duck) => (

              <TableRow
                key={machine.machine_Address}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{machine.machine_Address}</TableCell>
                <TableCell>{machine.machine_Spaces}</TableCell>
                <TableCell>
                {machine.umbrellas.map((umbrella) => (
                    <Button
                    variant="contained" color="primary"
                      value={umbrella.umbrella_Id}
                      onClick={() => rent(umbrella.umbrella_Id)}
                    >
                      {umbrella.umbrella_Id}
                    </Button>
                ))}

                  </TableCell>
              </TableRow>
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

