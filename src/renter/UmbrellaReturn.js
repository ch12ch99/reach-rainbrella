import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from '@mui/material';
import { getFirestore, doc, updateDoc } from '@firebase/firestore';

export default function UmbrellaRent(props) {
    const [umbrella, setUmbrella] = useState({ machine_Id:"", umbrella_Status: 0 })
    const [account, setAccount] = useState({ umbrella_Id: "" })
    useEffect(() => setUmbrella({ ...props.umbrella }), [props.umbrella]);
    const umbrellaupdate = async function () {
        const db = getFirestore();
        try {
            await updateDoc(doc(db, "umbrella", umbrella.id), {
                machine_Id: umbrella.machine_Id,
                umbrella_Status: "true"
            });
            await updateDoc(doc(db, "account", account.id), {
                umbrella_Id: "",
            });
        }catch (e) {
            console.log(e);
        }
        console.log("成功還傘!");
        props.close();
    }
    return (
        <Dialog open={props.open}>
            <DialogTitle>租借</DialogTitle>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={umbrellaupdate}>還傘</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}