import React, { useEffect, useState, useContext } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { doc, getDocs } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import AppMenu from "../ui/AppMenu";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignIn from "../account/SignIn";
import SignUp from "../account/SignUp";
 import "../account/SignIn.css";

export default function MachineList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [open, setOpen] = useState(false);
  const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
  const [currentMachine, setCurrentMachine] = useState(false);
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
    }
    readData();
  }, [db]);

  const MachineListComponent = function () {
    return (
      <div class="container">
        <List subheader="Machine list" aria-label="machine list">
          <br />
          {machines.map((machine, duck) => (
            <ListItem divider key={duck}>
              <Button>
                <ListItemText
                  primary={"地址:" + machine.machine_Address}
                  secondary={"空間:" + machine.machine_Spaces}
                ></ListItemText>
              </Button><br />
            </ListItem>
          ))}
        </List>
      </div>
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
        <MachineListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}
    </Box>
  );
}
