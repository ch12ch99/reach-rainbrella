import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp } from "firebase/app";
import { doc, getDocs, deleteDoc } from '@firebase/firestore';
import { getFirestore } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { config } from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import MachineAddEdit from './MachineAddEdit';

export default function MachineList() {
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [umbrellas, setUmbrellas] = useState(false);
    const [machines, setMachines] = useState([]); //useState是存firebase的資料 所以要用[]
    const [currentMachine, setCurrentMachine] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        async function readData() {
          setIsLoading(true);
          const querySnapshot = await getDocs(collection(db, "machine")); // db後面是接table name 不是專案名稱
          const temp = [];
          querySnapshot.forEach((doc) => {
            temp.push({id: doc.id,machine_Id: doc.machine_Id, machine_Address: doc.data().machine_Address, machine_Spaces: doc.data().machine_Spaces });
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
        setCurrentMachine({ machine_Address:"", machine_Spaces: 0 });
        setOpen(true);
    }

    const editData = async function (duck) {
      console.log(duck);
      setCurrentMachine({...machines[duck]});
      setOpen(true);
    }

    const deleteData = async function (id) {
        try {
          setIsLoading(true);
          await deleteDoc(doc(db, "machine", id));
          //console.log("deleted");
          setDeleted(deleted + 1);
          setIsLoading(false);
        }
        catch (error) {
          console.log(error);
        }
      }

    const close = async function () {
        setOpen(false);
      }

    const MachineListComponent = function () {
        return (
            <List subheader="Machine list" aria-label="machine list">
                {machines.map((machine, duck) =>
                  <ListItem divider key={duck}>
                    <ListItemText primary={"地址:" + machines.machine_Address} secondary={"空間:" + machines.machine_Spaces}></ListItemText>
                    <IconButton edge="end" aria-label="edit" onClick={() => editData(duck)}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteData(machine.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>)
                }
              </List >
        )
    }
    return (
        <Box sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'background.paper',
            color: 'black',
            textAlign: 'left'
        }}>
            <AppMenu />
              {!isLoading ?
                <MachineListComponent />
                :
                <CircularProgress />
              }
              <Fab color="primary" aria-label="新增" onClick={addData}
                sx={{
                  position: "fixed",
                  bottom: (theme) => theme.spacing(2),
                  right: (theme) => theme.spacing(8)
                }}>
                <AddIcon />
              </Fab>
              <MachineAddEdit open={open} close={close} machine={currentMachine} />
            </Box>
          );
        }