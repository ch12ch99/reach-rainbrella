import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { getFirestore, collection, doc, setDoc } from '@firebase/firestore';

export default function UmbrellaRent(props) {
    const [umbrella, setUmbrella] = useState({ machine_Id:"", umbrella_Status: 0 })
    const [account, setAccount] = useState({ umbrella_Id: "" })
    useEffect(() => setUmbrella({ ...props.umbrella }), [props.umbrella]);
    const handleChange = function (e) {
        setUmbrella({ ...umbrella, [e.target.name]: e.target.value })
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    const umbrellaupdate = async function () {
        const db = getFirestore();
        try {
            await setDoc(doc(db, "umbrella", umbrella.id), {
                machine_Id: umbrella.machine_Id,
                umbrella_Status: "租借中"
            });
            await setDoc(doc(db, "account", account.id), {
                umbrella_Id: account.umbrella_Id,
            });
        }catch (e) {
            console.log(e);
        }
        console.log("成功租借!");
        props.close();
    }
    return (
        <Dialog open={props.open}>
            <DialogTitle>租借</DialogTitle>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={umbrellaupdate}>租借</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}