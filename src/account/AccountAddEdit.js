import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { getFirestore, collection, doc, addDoc, setDoc } from '@firebase/firestore';

export default function AccountAddEdit(props) {
    const [account, setAccount] = useState({ account_Status:"", machine_Id: 0 })
    useEffect(() => setAccount({ ...props.account }), [props.account]);
    const action = !props.account.id ? "新增" : "修改";
    const handleChange = function (e) {
        setAccount({ ...account, [e.target.name]: e.target.value })
    }
    const update = async function () {
        const db = getFirestore();
        try {
            if (action === "新增") {
                const docRef = await addDoc(collection(db, "account"), {
                    account_Status: account.account_Status,
                    machine_Id: parseInt(account.machine_Id)
                });
                console.log(docRef.id);
            }
            else {
                await setDoc(doc(db, "account", account.id), {
                    account_Status: account.account_Status,
                    machine_Id: parseInt(account.machine_Id)
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
            <DialogTitle>{action}帳戶</DialogTitle>
            <DialogContent>
                <TextField label="帳號權限" name="account_Status" variant="outlined" value={account.account_Status} onChange={handleChange} />
                <TextField label="基台" type="number" name="machine_Id" variant="outlined" value={account.machine_Id} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={update}>{action}</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}