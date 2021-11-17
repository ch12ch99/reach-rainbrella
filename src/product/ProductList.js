import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import setDeleted from 'react-dom';
import AppMenu from '../ui/AppMenu';
import { initializeApp } from "firebase/app";
import { config } from '../settings/firebaseConfig';
import { collection } from '@firebase/firestore';
import { useEffect } from 'react';
import { getDocs, doc, deleteDoc, } from '@firebase/firestore';
import { CircularProgress } from '@mui/material';
<<<<<<< Updated upstream
import { getFirestore, } from '@firebase/firestore';
import { Fab } from '@mui/material';
import ProductAddEdit from './ProductAddEdit';
=======
import { orderBy,getFirestore,query } from '@firebase/firestore';
import ProductAddEdit from './ProductAddEdit';
import { Fab } from '@mui/material';
>>>>>>> Stashed changes

export default function ProductList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< Updated upstream
  const [open, setOpen] = React.useState(false);
  const [deleted, setDeleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(false);
 
=======
  const [open, setOpen] = useState(false);
  const [currentProduct,setCurrentProduct] = useState(false);
  const [deleted] = useState(false);
  const [products, setProducts] = useState([
    //   {des:"iPad Light", price:20000},
    //   {des:"iPhone XR", price:30000},
  ]);
>>>>>>> Stashed changes

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
<<<<<<< Updated upstream
      const querySnapshot = await getDocs(collection(db, "product"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, des: doc.data().des, price: doc.data().price });
        console.log(doc.id);
        console.log(doc.data().des);
      });
=======
      //const querySnapshot = await getDocs(collection(db, "product"));t
      const querySnapshot = await getDocs(collection(db, "product"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        temp.push({id: doc.id, des: doc.data().des, price: doc.data().price});
      });
      //console.log(temp);
>>>>>>> Stashed changes
      setProducts([...temp]);
      
      setIsLoading(false);
    }
    readData();
  }, [db, open, deleted]);
<<<<<<< Updated upstream

  const addData = async function () {
    setCurrentProduct({ des: "", price: 0 });
    setOpen(true);
  }
  const editData = async function (index) {
    console.log(index);
    setCurrentProduct({...products[index]});
    setOpen(true);
  }
  const deleteData = async function (id) {
=======
  const close = function(){
    setOpen(false);
  }
  const addData = async function(){
    setCurrentProduct({des:"", price:0});
    setOpen(true);
  }
  const editData = async function(index){
    setCurrentProduct(products[index]);
    setOpen(true);
  }
  const deleteData = async function(id) {
>>>>>>> Stashed changes
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "product", id));
      console.log("deleted");
      setDeleted(deleted + 1);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    }

  }
  const close = async function () {
    setOpen(false);
  }

  const ProductListComponent = function () {
    return (
      <List subheader="Product list" aria-label="product list">
        {products.map((product, index) =>
          <ListItem divider key={index}>
            <ListItemText primary={product.des} secondary={"NT$" + product.price}></ListItemText>
            <IconButton edge="end" aria-label="edit" onClick={() => editData(index)}>
<<<<<<< Updated upstream
              <CreateIcon />
=======
              <CreateIcon/>
>>>>>>> Stashed changes
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteData(product.id)}>
              <DeleteIcon />
            </IconButton>
<<<<<<< Updated upstream
          </ListItem>)
        }
      </List >
=======
          </ListItem>)}
      </List>
>>>>>>> Stashed changes
    )
  }
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'background.paper',
      color: 'black',
      textAlign: 'left'
    }}>
      <AppMenu />
      {!isLoading ?
        <ProductListComponent />
        :
        <CircularProgress />
      }
      <Fab color="primary" aria-label="新增" onClick={addData}
        sx={{
          position: "fixed",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(8)
        }}>
        <CreateIcon />
      </Fab>
      <ProductAddEdit open={open} close={close} product={currentProduct} />
    </Box>
  );
}
<<<<<<< Updated upstream
/*
<Box sx={{
  width: '100vw',
  height: '100vh',
  backgroundColor: 'background.paper',
  color: 'black',
  textAlign: 'left'
}}>
  <AppMenu />
  {!isLoading ?
    <ProductListComponent />
    :
    <CircularProgress />
  }
  <Fab color="primary" aria-label="新增" onClick={addData}
    sx={{
      position: "fixed",
      bottom: (theme) => theme.spacing(2),
      right: (theme) => theme.spacing(8)
    }}>
    <AddIcon />
  </Fab>
  <ProductAddEdit open={open} close={close} product={currentProduct} />
</Box>
*/
=======
return (
  <Box sx={{
    width: '100vw',
    height: '100vh',
    backgroundColor: 'background.paper',
    color: 'black',
    textAlign: 'left'
  }}>
    <AppMenu />
    {!isLoading ?
      <ProductListComponent />
      :
      <CircularProgress />
    }
    <Fab color="primary" aria-label="新增" onClick={addData}
    sx={{
      position:"fixed",
      bottom: (theme) => theme.spacing(2),
      right: (theme) =>theme.spacing(8)
    }}
    >
      <CreateIcon />
    </Fab>
    <ProductAddEdit open={open} close={close} product={currentProduct}/>
  </Box>
);
}
>>>>>>> Stashed changes
