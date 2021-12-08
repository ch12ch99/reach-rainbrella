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
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
    const [currentMachine, setCurrentMachine] = useState(false);

    useEffect(()=>{
      async function readData() {
        const querySnapshot = await getDocs(collection(db, "machine"));
        const temp = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

          console.log(doc.id, " => ", doc.data());
          temp.push({id: doc.id,
            machine_Id: doc.data().machine_Id,
            machine_Address: doc.data().machine_Address,
            machine_Spaces: doc.data().machine_Spaces});
        });
        console.log(temp);
        setProducts([...temp]);
      }
      readData();
    },[db]);

    const MachineListComponent = function () {
      return (
        <List subheader="Machine list" aria-label="machine list">
          {machines.map((machine, duck) =>
            <ListItem divider key={duck}>
              <ListItemText 
                primary={"地址:" + machine.machine_Address} 
                secondary={"空間:" + machine.machine_Spaces}>
              </ListItemText>
            </ListItem>)}
        </List >
      );
    }
};