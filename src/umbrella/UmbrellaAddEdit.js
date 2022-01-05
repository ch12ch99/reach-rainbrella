import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { getFirestore, collection, doc, addDoc, updateDoc } from '@firebase/firestore';

export default function UmbrellaAddEdit(props) {
    const [umbrella, setUmbrella] = useState({ umbrella_Status:"", machine_Id: 0 })
    useEffect(() => setUmbrella({ ...props.umbrella }), [props.umbrella]);
    const action = !props.umbrella.id ? "新增" : "修改";
    const handleChange = function (e) {
        setUmbrella({ ...umbrella, [e.target.name]: e.target.value })
    }
    const update = async function () {
        const db = getFirestore();
        try {
            if (action === "新增") {
                const docRef = await addDoc(collection(db, "umbrella"), {
                    umbrella_Status: umbrella.umbrella_Status,
                    machine_Id: parseInt(umbrella.machine_Id)
                });
                console.log(docRef.id);
            }
            else {
                await updateDoc(doc(db, "umbrella", umbrella.id), {
                    umbrella_Status: umbrella.umbrella_Status,
                    machine_Id: parseInt(umbrella.machine_Id)
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
            <DialogTitle>{action}雨傘</DialogTitle>
            <DialogContent>
                <TextField label="狀態" name="umbrella_Status" variant="outlined" value={umbrella.umbrella_Status} onChange={handleChange} />
                <TextField label="基台" type="number" name="machine_Id" variant="outlined" value={umbrella.machine_Id} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={update}>{action}</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}