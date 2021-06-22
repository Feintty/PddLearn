import React from "react";
import {Redirect} from "react-router-dom"
import TicketsPlay from "../ticketsPlay/index";

function Play({param,type,user}) {

 if(type && param) {
    return (
      <TicketsPlay  type={type} param={param} user={user} />
  )}
  else{
    return <Redirect to="/"/>
  }
}
export default Play;
