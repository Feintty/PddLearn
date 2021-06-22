import React, { useState,useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./index.css";
import Main from "./pages/main";
import Theory from "./pages/theory";
import Tickets from "./pages/tickets";
import Exam from "./exam/index";
import Authorization from "./authorization/index";
import Header from "./header/index";
import Footer from "./footer/index";
import Statistics from "./pages/statistics";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setUser(sessionStorage.getItem('token'));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/stats">
          <Statistics user={user} />
        </Route>
        <Route path="/theory">
          <Theory />
        </Route>
        <Route path="/tickets">
          <Tickets user={user} />
        </Route>
        <Route path="/exam">
          <div className="wrapper">
            <Exam user={user} />
          </div>
        </Route>
        <Route path="/auth">
          <div className="wrapper">
            <Authorization setUser={setUser} />
          </div>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
