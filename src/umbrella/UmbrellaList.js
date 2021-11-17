import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp } from "firebase/app";
import { doc, getDocs, deleteDoc } from '@firebase/firestore';
import { getFirestore } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { config } from '../settings/firebaseConfig';
import AppMenu from '../ui/AppMenu';
import UmbrellaAddEdit from './UmbrellaAddEdit';

export default function UmbrellaList() {
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [umbrellas, setUmbrellas] = useState(false);
    const [currentUmbrella, setCurrentUmbrella] = useState(false);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        async function readData() {
          setIsLoading(true);
          const querySnapshot = await getDocs(collection(db, "Rainbrella"));
          const temp = [];
          querySnapshot.forEach((doc) => {
            temp.push({ umbrella_Id: doc.umbrella_Id, umbrella_Status: doc.data().umbrella_Status, machine_Id: doc.data().machine_Id });
            console.log(doc.umbrella_Id);
            console.log(doc.data().umbrella_Status);
          });
          setUmbrellas([...temp]);
          setIsLoading(false);
        }
        readData();
    }, [db, open, deleted]);

    const addData = async function () {
        setCurrentUmbrella({ umbrella_Status:"", machine_Id: 0 });
        setOpen(true);
    }

    const editData = async function (index) {
      console.log(index);
      setCurrentUmbrella({...umbrellas[index]});
      setOpen(true);
    }

    const deleteData = async function (umbrella_Id) {
        try {
          setIsLoading(true);
          await deleteDoc(doc(db, "Rainbrella", umbrella_Id));
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

    const UmbrellaListComponent = function () {
        return (
            <List subheader="Umbrella list" aria-label="umbrella list">
                {umbrellas.map((umbrella, index) =>
                  <ListItem divider key={index}>
                    <ListItemText primary={"狀態:" + umbrella.umbrella_Status}></ListItemText>
                    <IconButton edge="end" aria-label="edit" onClick={() => editData(index)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteData(umbrella.umbrella_Id)}>
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
                <UmbrellaListComponent />
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
              <UmbrellaAddEdit open={open} close={close} product={currentUmbrella} />
            </Box>
          );
        }