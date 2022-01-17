import React, { useState, useContext } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./ui/Main";
import { AuthContext, STATUS } from "./account/AuthContext";
import { LevelContext, LEVEL } from "./account/LevelContext";
import ProductList from "./product/ProductList";
import AccountList from "./account/AccountList";
import UmbrellaList from "./umbrella/UmbrellaList";
import MachineList from "./machine/MachineList";
import renter_MachineList from "./renter/renter_MachineList";
import { MeowContext, MEOW } from "./ui/AppMenu";

export default function AppRouter() {
  const authContext = useContext(AuthContext);
  const levelContext = useContext(LevelContext);
  const [status, setStatus] = useState(STATUS.toSignIn); //我爲了測試註冊所以我預設是Out啊！要登錄請直接改動此！
  const [level, setLevel] = useState(LEVEL.isUser);
  const [meow, setMeow] = useState(MEOW.meowCount);
  return (
    <AuthContext.Provider value={{ status, setStatus }}>
      <LevelContext.Provider value={{ level, setLevel }}>
        <MeowContext.Provider value={{ meow, setMeow }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/product" component={ProductList} />
              <Route path="/account" component={AccountList} />
              <Route path="/umbrella" component={UmbrellaList} />
              <Route path="/machine" component={MachineList} />
              <Route path="/renter" component={renter_MachineList} />
            </Switch>
          </Router>
        </MeowContext.Provider>
      </LevelContext.Provider>
    </AuthContext.Provider>
  );
}
//Route版本5.3.0要使用exact來path 不然他只會到上層
