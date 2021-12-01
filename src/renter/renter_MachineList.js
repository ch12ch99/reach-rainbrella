import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDocs } from '@firebase/firestore';
import { getFirestore } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { config } from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';

export default function MachineList() {
  console.log("123");
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
    const [currentMachine, setCurrentMachine] = useState(false);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      const account_Name = user.account_Name;
      const umbrella_Id = user.umbrella_Id;
      console.log(account_Name);
      console.log(account_Name);

    const MachineListComponent = function () {
        return (
            <List subheader="Machine list" aria-label="machine list">
                {machines.map((machine, duck) =>
                  <ListItem divider key={duck}>
                    <ListItemText primary={"地址:" + machine.machine_Address} secondary={"空間:" + machine.machine_Spaces}></ListItemText>
                  </ListItem>)
                }
              </List >
        )
    }}else{
      setMessage("please sign in!");
    }
  }
  )};