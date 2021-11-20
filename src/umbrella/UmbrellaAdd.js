import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { addDoc } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { getFirestore } from "firebase/firestore";

export default function UmbrellaAdd(props) {
    const db = getFirestore();
    const addumbrella = async function(){
        try{
            const docRef = await addDoc(collection(db,"umbrella"),{
                umbrella_Status:parseInt(umbrella.umbrella_Status),
                machine_Id:parseInt(umbrella.machine_Id)
                //需要在哪個基台但我不會寫
            });
                console.log(docRef.umbrella_Id);
                const temp = [];
                docRef.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                      console.log(doc.umbrella_Id, " => ", doc.data());
                      temp.push({umbrella_Id:doc.umbrella_Id, umbrella_Status:doc.data().umbrella_Status, machine_Id:doc.data().machine_Id});
                    });
            }catch(e) {
                console.log(e);
            }
    }

    const [umbrella, setUmbrella] = useState({ umbrella_Status:"", machine_Id: 0 })
    const handleClick = function (e) {
        setUmbrella({ ...umbrella, [e.target.name]: e.target.value })
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>新增</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>雨傘</DialogTitle>
                <DialogContent>
                    狀態:<input type="text" name="umbrella_Status" value={umbrella.umbrella_Status} onChange={handleClick} /><br />
                    <br />
                    基台:<input type="text" name="machine_Id" value={umbrella.machine_Id} onChange={handleClick} /><br />
                </DialogContent>
                <DialogActions>
                    <button variant="outlined" onClick={addumbrella}>新增</button>
                    <button variant="outlined" onClick={handleClose}>關閉</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}