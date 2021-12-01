import React, {useState, useContext} from "react";
//改用Switch，是react的switch喲
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./ui/Main";
import { AuthContext, STATUS } from "./account/AuthContext";
//import { Switch } from "@mui/material";
import ProductList from "./product/ProductList";
import AccountList from "./account/AccountList";
import UmbrellaList from "./umbrella/UmbrellaList";
import MachineList from "./machine/MachineList";
import SignOut from "./account/SignOut";


export default function AppRouter() {
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState(STATUS.toSignOut);
   
  return (
    <AuthContext.Provider value={{ status, setStatus}}>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} /> //Route版本5.3.0要使用exact來path 不然他只會到上層
          <Route path="/product" component={ProductList} />
          <Route path="/account" component={AccountList} />
          <Route path="/umbrella" component={UmbrellaList} />
          <Route path="/machine" component={MachineList} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
