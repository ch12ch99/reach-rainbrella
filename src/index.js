import React from "react";
import ReactDOM from "react-dom";
//import './index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import reportWebVitals from "./reportWebVitals";
import ProductList from "./product/ProductList";
import AccountList from "./account/AccountList";
import UmbrellaList from "./umbrella/UmbrellaList";
import MachineList from "./machine/MachineList";
import renter_MachineList from "./renter/renter_MachineList";
import Main from "./ui/Main";
import AppRouter from "./AppRouter";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d98cd",
    },
    secondary: {
      main: "#ff4500",
    },
    superqiuqiu: {
      main: "#E91E63",
    },
  },
  //阿邱邱的炫泡設計
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
