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
                    account_Authority: account.account_Authority,
                    account_Name: parseInt(account.account_Name),
                    account_Email: parseInt(account.account_Email),
                    account_Id: parseInt(account.account_Id),
                    account_Password: parseInt(account.account_Password),
                    umbrella_Id: parseInt(account.umbrella_Id)
                });
                console.log(docRef.id);
            }
            else {
                await setDoc(doc(db, "account", account.id), {
                    account_Authority: account.account_Authority,
                    account_Name: parseInt(account.account_Name),
                    account_Email: parseInt(account.account_Email),
                    account_Id: parseInt(account.account_Id),
                    account_Password: parseInt(account.account_Password),
                    umbrella_Id: parseInt(account.umbrella_Id)
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
                <hr/>
                <TextField label="帳號名稱" name="account_Name" variant="outlined" value={account.account_Name} onChange={handleChange} /><hr />
                <TextField label="E-mail" name="account_Email" variant="outlined" value={account.account_Email} onChange={handleChange} /><hr />
                <TextField label="Id" name="account_Id" variant="outlined" value={account.account_Id} onChange={handleChange} /><hr />
                <TextField label="Password" name="account_Password" variant="outlined" value={account.account_Password} onChange={handleChange} /><hr />
                <TextField label="雨傘編號" name="umbrella_Id" variant="outlined" value={account.umbrella_Id} onChange={handleChange} /><hr />
                <TextField label="是否為管理者" type="boolean" name="account_Authority" variant="outlined" value={account.account_Authority} onChange={handleChange} /><hr />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={update}>{action}</Button>
                <Button variant="outlined" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
    );
}