import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { addDoc } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { getFirestore } from "firebase/firestore";

export default function MachineAdd(props) {
    const db = getFirestore();
    const addmachine = async function(){
        try{
            const docRef = await addDoc(collection(db,"machine"),{
                machine_Address:parseInt(machine.machine_Address),
                machine_Spaces:parseInt(machine.machine_Spaces)
                //需要在哪個基台但我不會寫
            });
                console.log(docRef.id);
                const temp = [];
                docRef.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      temp.push({id: doc.id, machine_Id:doc.data().machine_Id, machine_Address:doc.data().machine_Address, machine_Spaces:doc.data().machine_Spaces});
                    });
            }catch(e) {
                console.log(e);
            }
    }

    const [machine, setMachine] = useState({ machineAddress:"", machine_Spaces: 0 })
    const handleClick = function (e) {
      setMachine({ ...machine, [e.target.name]: e.target.value })
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
                <DialogTitle>機台</DialogTitle>
                <DialogContent>
                    機台位址:<input type="text" name="machine_Address" value={machine.machine_Address} onChange={handleClick} /><br />
                    <br />
                    機台空間:<input type="text" name="machine_Spaces" value={machine.machine_Spaces} onChange={handleClick} /><br />
                    <br />
                    機台ID:<input type="text" name="machine_Id" value={machine.machine_Id} onChange={handleClick} /><br />
                </DialogContent>
                <DialogActions>
                    <button variant="outlined" onClick={addmachine}>新增</button>
                    <button variant="outlined" onClick={handleClose}>關閉</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}