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
import AccountAddEdit from './AccountAddEdit';

export default function AccountList() {
    const firebaseApp = initializeApp(config);
    const db = getFirestore();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [accounts, setAccounts] = useState([]); //useState是存firebase的資料 所以要用[]
    const [currentAccount, setCurrentAccount] = useState(false);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        async function readData() {
          setIsLoading(true);
          const querySnapshot = await getDocs(collection(db, "account")); // db後面是接table name 不是專案名稱
          const temp = [];
          querySnapshot.forEach((doc) => {
            temp.push({id: doc.id,account_Id: doc.account_Id, account_Authority: doc.data().account_Authority, account_Id: doc.data().account_Id });
            //自己設的_Id與系統給的id不同
            console.log(doc.id);
            console.log(doc.data().account_Authority);
          });
          setAccounts([...temp]);
          setIsLoading(false);
        }
        readData();
    }, [db, open, deleted]);
    
    const addData = async function () {
        setCurrentAccount({ account_Authority:"", machine_Id: 0 });
        setOpen(true);
    }

    const editData = async function (red) {
      console.log(red);
      setCurrentAccount({...accounts[red]});
      setOpen(true);
    }

    const deleteData = async function (id) {
        try {
          setIsLoading(true);
          await deleteDoc(doc(db, "account", id));
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


      const AccountListComponent = function () {
        return (
            <List subheader="Account list" aria-label="account list">
                {accounts.map((account, red) =>
                  <ListItem divider key={red}>
                    <ListItemText primary={"帳號名稱:" + account.account_Name} secondary={"E-mail:" + account.machine_Id + <br> + "E-mail:" + account.machine_Id + </br>}></ListItemText>

                    <IconButton edge="end" aria-label="edit" onClick={() => editData(red)}>
                      <CreateIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteData(account.id)}>
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
                <AccountListComponent />
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
              <AccountAddEdit open={open} close={close} account={currentAccount} />
            </Box>
          );
        }