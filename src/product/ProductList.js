import React, { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

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

  function createData(des, price) {
    return { des, price };
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#59FFFF',
      color: 'black',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 30,
    },
  }));

  const ProductListComponent = function () {
    return (
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          
          <ImageList  variant="masonry" cols={4} gap={4}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  subtitle={<span>by: {item.author}</span>}
                  position="below"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Table>
      </TableContainer>
      // {<List subheader="Product list" aria-label="product list">
      //   {products.map((product, index) => (
      //     <ListItem divider key={index}>
      //       <ListItemText
      //         primary={product.des}
      //         secondary={"NT$" + product.price}
      //       ></ListItemText>
      //       <IconButton
      //         edge="end"
      //         aria-label="edit"
      //         onClick={() => editData(index)}
      //       >
      //         <CreateIcon />
      //       </IconButton>
      //       <IconButton
      //         edge="end"
      //         aria-label="delete"
      //         onClick={() => deleteData(product.id)}
      //       >
      //         <DeleteIcon />
      //       </IconButton>
      //     </ListItem>
      //   ))}
      // </List>}
      
    );
  };
  const itemData = [
    {
      img: 'https://img.shop.com/Image/260000/269000/269079/products/1581085926__400x400__.jpg',
      title: '反向折傘',
      author: '-反向系列-',
    },
    {
      img: 'https://shoplineimg.com/5a94b05172fdc00403008a1c/5ed497b018d9010033ac3dff/800x.webp?source_format=jpg',
      title: '自動折傘',
      author: '-自動系列-',
    },
    {
      img: 'https://cf.shopee.tw/file/f80fd727552ad4242417062d264a8503',
      title: '自動反向傘',
      author: '-自動系列-',
    },
    {
      img: 'https://www.decus.com.tw/archive/image/product3/images/layoutlist/decus0359.png',
      title: '自動直傘',
      author: '-自動系列-',
    },
    {
      img: 'https://image.nitori-net.tw/Storage/ItemImages/001/1500/1502/8699278/ViewBig/8699278_01.jpg',
      title: '手動折傘',
      author: '-手動系列-',
    },
    {
      img: 'https://img.udnfunlife.com/image/product/DS005281/APPROVED/DU00080370/20211004174017015_1000.jpg?t=20211018195321',
      title: '自動反向傘',
      author: '-自動系列-',
    },
    {
      img: 'https://shoplineimg.com/5670feec039055febe00003a/5cbeb8f64c23c20023420cf8/800x.webp?source_format=jpeg',
      title: '手動折傘',
      author: '-手動系列-',
    },
    {
      img: 'https://shoplineimg.com/5670feec039055febe00003a/5cbeb8f6772eca00357a3682/800x.webp?source_format=jpeg',
      title: '自動直傘',
      author: '-自動系列-',
    },
    
  
  ];
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
      <AppMenu /><br/>
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
      {authContext.status === STATUS.toSignIn ? null : authContext.status ===
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
