import { useEffect } from 'react';
<<<<<<< Updated upstream
import { useState } from 'react';
import { getFirestore, collection, doc, addDoc, setDoc } from '@firebase/firestore';
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

export default function ProductAddEdit(props) {
=======
import { collection } from '@firebase/firestore';
import React, { useState } from 'react';
import { getFirestore } from "@firebase/firestore";
import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { TextField } from "@mui/material";
import { DialogContent } from "@mui/material";

export default function ProductAddEdit(props) {
    const db = getFirestore();
>>>>>>> Stashed changes
    const [product, setProduct] = useState({ des: "", price: 0 })
    const handleClickDes = function (e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    useEffect(() => setProduct({ ...props.product }), [props.product]);
    const action = !props.product.id ? "新增" : "修改";
    const handleChange = function (e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const update = async function () {
         const db = getFirestore();
        try {
            if (action === "新增") {
                const docRef = await addDoc(collection(db, "product"), {
                    des: product.des,
                    price: parseInt(product.price)
                });
                console.log(docRef.id);
            }
            else {
                await setDoc(doc(db, "product", product.id), {
                    des: product.des,
                    price: parseInt(product.price)
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
            <DialogTitle>{action}產品</DialogTitle>
            <DialogContent>
<<<<<<< Updated upstream
                <TextField label="產品描述" name="des" variant="outlined" value={product.des} onChange={handleChange} />
                <TextField label="產品價格" type="number" name="price" variant="outlined" value={product.price} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={update}>{action}</Button>
                <Button variant="outlined" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>

    );

}




=======
                <TextField label="產品描述" name="des" variant="outlined" value={product.des} onChange={handleChange} /><br />
                <TextField label="產品價格" type="number" name="price" variant="outlined" value={product.price} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={update}>{action}新增</Button>
                <Button variant="contained" color="secondary" onClick={props.close}>取消</Button>
            </DialogActions>
        </Dialog>
      )
}
>>>>>>> Stashed changes
