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
import { getDocs,  doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { CircularProgress } from '@mui/material';
import { orderBy,getFirestore,query } from '@firebase/firestore';
import ProductAdd from './ProductAdd';




export default function ProductList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [open] = React.useState(false);
  const deleted = useState(false);  
  const [products, setProducts] = useState([
    //   {desc:"iPad Light", price:20000},
    //   {desc:"iPhone XR", price:30000},
  ]);

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      //const querySnapshot = await getDocs(collection(db, "product"));t
      const querySnapshot = await getDocs(query(collection(db, "product"), orderBy("des")));
      const temp = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        temp.push({ id: doc.id, des: doc.data().des, price: doc.data().price });
      });
      console.log(temp);
      setProducts([...temp]);
      setIsLoading(false);
    }
    readData();
  }, [db, open]);
  const deleteData = async function (id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "product", id));
      //console.log("deleted");
      setDeleted(deleted + 1);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
    }

  }
  const ProductListComponent = function () {
    return (
      <List subheader="Product list" aria-label="product list">
        {products.map((product, index) =>
          <ListItem divider key={index}>
            <ListItemText primary={product.des} secondary={"NT$" + product.price}></ListItemText>
            <IconButton edge="end" aria-label="create" onClick={() => deleteData(product.id)}>
              <CreateIcon/>
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteData(product.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>)
  }
      </List >
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
    <ProductAdd />
  </Box>
);
}