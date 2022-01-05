import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { getFirestore, collection, doc, addDoc, updateDoc } from '@firebase/firestore';

export default function MachineAddEdit(props) {
    const [machine, setMachine] = useState({ machine_Address:"", machine_Spaces: 0 })
    useEffect(() => setMachine({ ...props.machine }), [props.machine]);
    const action = !props.machine.id ? "新增" : "修改";
    const handleChange = function (e) {
        setMachine({ ...machine, [e.target.name]: e.target.value })
    }
    const machineupdate = async function () {
        const db = getFirestore();
        try {
            if (action === "新增") {
                const docRef = await addDoc(collection(db, "machine"), {
                    machine_Address: machine.machine_Address,
                    machine_Spaces: parseInt(machine.machine_Spaces)
                });
                console.log(docRef.id);
            }
            else {
                await updateDoc(doc(db, "machine", machine.id), {
                    machine_Address: machine.machine_Address,
                    machine_Spaces: parseInt(machine.machine_Spaces)
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        props.close();
    }
    return (
        <Dialog open={props.open}>
            <DialogTitle>{action}機台</DialogTitle>
            <DialogContent>
                <TextField label="機台位址" name="machine_Address" variant="outlined" value={machine.machine_Address} onChange={handleChange} />
                <TextField label="機台空間" type="number" name="machine_Spaces" variant="outlined" value={machine.machine_Spaces} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={machineupdate}>{action}</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}