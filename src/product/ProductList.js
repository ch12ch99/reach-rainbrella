import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';
import AppMenu from '../ui/AppMenu';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {config} from '../settings/firebaseConfig';
import { collection } from '@firebase/firestore';
import { useEffect } from 'react';
import { getDocs, setDoc } from '@firebase/firestore';
import { CircularProgress } from '@mui/material';
import { onSnapshot} from "firebase/firestore";
import { query } from '@firebase/firestore';
import { orderBy } from '@firebase/firestore';
import ProductAdd from './ProductAdd';

export default function ProductList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [open] = React.useState(false);
  
  const [products,setProducts]=useState([
  //   {desc:"iPad Light", price:20000},
  //   {desc:"iPhone XR", price:30000},
    ]);
    useEffect(()=>{
      async function readData() {
        setIsLoading(true);
        //const querySnapshot = await getDocs(collection(db, "product"));t
        const querySnapshot = await getDocs(query(collection(db, "product"), orderBy("des")));
        const temp = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          temp.push({id:doc.id, des:doc.data().des, price:doc.data().price});
        });
        console.log(temp);
        setProducts([...temp]);
        setIsLoading(false);
      }
      readData();
    },[db, open]);

    const ProductListComponent = function (){
      return (
        <List subheader="Product list" aria-label="product list">
        {products.map((product, index) => 
          <ListItem divider key={index}>
            <ListItemText primary={product.des} secondary={"NT$"+product.price}></ListItemText>
          </ListItem>)}
        </List>
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
      <AppMenu/>
      {!isLoading ?
        <ProductListComponent/>
         :
        <CircularProgress />
      }
      <ProductAdd/>
      </Box>
    );
  }