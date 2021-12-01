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
import Main from "./ui/Main";
import AppRouter from './AppRouter';

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d98cd",
    },
    secondary: {
      main: "#1d98cd",
    },
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