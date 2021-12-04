import React, { useEffect, useState, useContext } from "react";
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { initializeApp } from "firebase/app";
import { collection } from "@firebase/firestore";
import { getDocs, doc, deleteDoc } from "@firebase/firestore";
import { getFirestore } from "@firebase/firestore";
import { config } from "../settings/firebaseConfig";
import AppMenu from "../ui/AppMenu";
import ProductAddEdit from "./ProductAddEdit";
import { AuthContext, STATUS } from "../account/AuthContext";
import SignIn from "../account/SignIn";
import SignUp from "../account/SignUp";

export default function ProductList() {
  const firebaseApp = initializeApp(config);
  const db = getFirestore();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(false);
  const authContext = useContext(AuthContext); //利用useContext hook取得AuthContext裡的值
  console.log(authContext.status);
  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "product"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, des: doc.data().des, price: doc.data().price });
        console.log(doc.id);
        console.log(doc.data().des);
      });
      setProducts([...temp]);
      setIsLoading(false);
    }
    readData();
  }, [db, open, deleted]);

  const addData = async function () {
    setCurrentProduct({ des: "", price: 0 });
    setOpen(true);
  };

  const editData = async function (index) {
    console.log(index);
    setCurrentProduct({ ...products[index] });
    setOpen(true);
  };

  const deleteData = async function (id) {
    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "product", id));
      //console.log("deleted");
      setDeleted(deleted + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const close = async function () {
    setOpen(false);
  };

  const ProductListComponent = function () {
    return (
      <List subheader="Product list" aria-label="product list">
        {products.map((product, index) => (
          <ListItem divider key={index}>
            <ListItemText
              primary={product.des}
              secondary={"NT$" + product.price}
            ></ListItemText>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => editData(index)}
            >
              <CreateIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteData(product.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  };
  return (
    <Box
      sx={{
        paddingLeft: "3vw",
        width: "90vw",
        height: "100vh",
        backgroundColor: "background.paper",
        color: "black",
        textAlign: "left",
      }}
    >
      <AppMenu />
      {authContext.status === "signOut" ? ( //查看預設狀態
        <ProductListComponent />
      ) : authContext.status === "signUp" ? (
        <SignUp />
      ) : (
        <SignIn />
      )}

      {/* {!isLoading ?
        
        :
        <CircularProgress /> 我不會塞isLoading在context裏面
      } */}
      {authContext.status === STATUS.toSignIn ? (null): authContext.status ===
        STATUS.toSignUp ? null : (
        <Fab
          color="primary"
          aria-label="新增"
          onClick={addData}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(8),
          }}
        >
          <AddIcon />
        </Fab>
      )}
      <ProductAddEdit open={open} close={close} product={currentProduct} />
    </Box>
  );
}
