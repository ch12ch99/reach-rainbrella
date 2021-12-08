import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { addDoc } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { getFirestore } from "firebase/firestore";

export default function AccountAdd(props) {
  const db = getFirestore();
  const addaccount = async function () {
    try {
      const docRef = await addDoc(collection(db, "account"), {
        account_Authority: Boolean(account.account_Authority),
        account_Name: account.account_Name,
        account_Email: account.account_Email,
        account_Id: account.account_Id,
        account_Password: account.account_Password,
        umbrella_Id: account.umbrella_Id,
      });
      console.log(docRef.id);
      const temp = [];
      docRef.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({
          id: doc.id,
          account_Authority: doc.data().account_Authority,
          account_Email: doc.data().account_Email,
          account_Id: doc.data().account_Id,
          account_Name: doc.data().account_Name,
          account_Password: doc.data().account_Password,
          account_Phone: doc.data().account_Phone,
          umbrella_Id: doc.data().umbrella_Id,
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [account, setaccount] = useState({
    account_Authority: "",
    account_Email: "",
    account_Id: "",
    account_Name: "",
    account_Password: "",
    account_Phone: "",
    umbrella_Id: "",
  });
  const handleClick = function (e) {
    setaccount({ ...account, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        新增
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>帳戶</DialogTitle>
        <DialogContent>
          帳號名稱:
          <input
            type="text"
            name="account_Name"
            value={account.account_Name}
            onChange={handleClick}
          />
          <br />
          <br />
          E-mail:
          <input
            type="text"
            name="account_Email"
            value={account.account_Email}
            onChange={handleClick}
          />
          <br />
          <br />
          Id:
          <input
            type="text"
            name="account_Id"
            value={account.account_Id}
            onChange={handleClick}
          />
          <br />
          <br />
          Password:
          <input
            type="text"
            name="account_Password"
            value={account.account_Password}
            onChange={handleClick}
          />
          <br />
          <br />
          雨傘編號:
          <input
            type="text"
            name="umbrella_Id"
            value={account.machinumbrella_Ide_Id}
            onChange={handleClick}
          />
          <br />
          <br />
          是否為管理者:
          <input
            type="text"
            name="account_Authority"
            value={account.account_Authority}
            onChange={handleClick}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <button variant="outlined" onClick={addaccount}>
            新增
          </button>
          <button variant="outlined" onClick={handleClose}>
            關閉
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
