import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { doc, updateDoc, getDocs } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { collection, query, where } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import { getAuth } from "firebase/auth";
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
  const [account, setAccount] = useState({ account_Status: "", machine_Id: 0 });
  useEffect(() => setAccount({ ...props.account }), [props.account]);
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentUmbrella, setCurrentUmbrella] = useState(false);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    async function readData() {
      //查看現在有哪些機臺
      const queryMachine = await getDocs(collection(db, "machine"));
      const u_ids = [];
      setMachines([]);
      queryMachine.forEach(async (doc) => {
        console.log("machine:", doc.id, " => ", doc.data());
        u_ids.push({
          machine_Id: doc.data().machine_Id,
        });
        console.log("機臺有" + u_ids.machine_Id);
        //機臺找傘
        const umbrellasameid = await getDocs(
          query(
            collection(db, "umbrella"),
            where("machine_Id", "==", doc.data().machine_Id) //
          )
        );
        const temp2 = [];
        umbrellasameid.forEach((doc) => {
          console.log("umbrella:", doc.id, " => ", doc.data());
          temp2.push({
            id: doc.id,
            umbrella_Id: doc.data().umbrella_Id,
          });
        });
        console.log(temp2);
        const data = {
          id: doc.id,
          machine_Id: doc.data().machine_Id,
          machine_Address: doc.data().machine_Address,
          machine_Spaces: doc.data().machine_Spaces,
          umbrellas: [...temp2],
        };
        console.log(data.umbrellas);
        setMachines((currentMachine) => [...currentMachine, data]);
      });
    }
    readData();
  }, [db, open]);

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

  const rentumbrella = async function (umbrella_Id) {
    //user
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    const u_email = user.email;
    console.log(u_email);
    const accountconn = collection(db, "account");
    const Result = query(accountconn, where("account_Email", "==", u_email));
    const q1 = await getDocs(Result);
    const put_umbrella = [];
    q1.forEach((doc) => {
      put_umbrella.push({
        id: doc.id,
      });
    });
    const u_id = put_umbrella[0].id;
    console.log(u_id);
    await updateDoc(doc(db, "account", put_umbrella[0].id), {
      umbrella_Id: umbrella_Id,
    });

    //umbrella
    const getumbrellaid = await getDocs(
      query(collection(db, "umbrella"), where("umbrella_Id", "==", umbrella_Id))
    );
    let temp = "";
    getumbrellaid.forEach((doc) => {
      console.log("umbrella", doc.id, " => ", doc.data());
      temp = doc.id;
    });
    await updateDoc(doc(db, "umbrella", temp), {
      machine_Id: "0",
      umbrella_Status: "false",
    });
    <renter_MachineList />;
    setOpen(true);
  };

  const MachineListComponent = function () {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <strong>地址</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>空間</strong>
              </StyledTableCell>
              <StyledTableCell align="left">
                <strong>機台雨傘</strong>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("machine in view:")}
            {console.log(machines)}
            {machines.map((machine) => (
              <TableRow
                key={machine.machine_Address}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {machine.machine_Address}
                </TableCell>
                <TableCell>{machine.machine_Spaces}</TableCell>
                <TableCell>
                  {machine.umbrellas.map((umbrella) => (
                    <Button
                      variant="contained"
                      color="primary"
                      value={umbrella.umbrella_Id}
                      onClick={() => rentumbrella(umbrella.umbrella_Id)}
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
