import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { addDoc } from '@firebase/firestore';
import { collection } from '@firebase/firestore';
import { getFirestore } from "firebase/firestore";


export default function ProductAdd(props) {
    const db = getFirestore();
    
    
    const addproduct = async function(){

        
        try{
            const docRef = await addDoc(collection(db,"product"),{
                des:product.des,
                price:parseInt(product.price)
            });
                console.log(docRef.id);
                const temp = [];
                docRef.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                      console.log(doc.id, " => ", doc.data());
                      temp.push({id:doc.id, des:doc.data().des, price:doc.data().price});
                    });
            }
            catch(e){
                console.log(e);
            }

    }
    const [product, setProduct] = useState({ des: "", price: 0 })
    const handleClick = function (e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const [open, setOpen] = React.useState(false);
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
                <DialogTitle>產品</DialogTitle>
                <DialogContent>
                    產品描述:<input type="text" name="des" value={product.des} onChange={handleClick} /><br />
                    <br />
                    產品價格:<input type="text" name="price" value={product.price} onChange={handleClick} /><br />
                </DialogContent>
                <DialogActions>
                    <button variant="outlined" onClick={addproduct}>新增</button>
                    <button variant="outlined" onClick={handleClose}>關閉</button>
                </DialogActions>
            </Dialog>
        </div>
 
 
    );
 
}

