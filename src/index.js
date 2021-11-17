import React from 'react';
import ReactDOM from 'react-dom';

//import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ProductList from './product/ProductList';
import AccountList from './account/AccountList';
import UmbrellaList from './umbrella/UmbrellaList';
import MachineList from './machine/MachineList';
import Main from './ui/Main';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1d98cd',
    },
    secondary: {
      main: '#1d98cd',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/product" component={ProductList} />
          <Route path="/account" component={AccountList} />
          <Route path="/umbrella" component={UmbrellaList} />
          <Route path="/machine" component={MachineList} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);