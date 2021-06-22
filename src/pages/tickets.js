import React from "react";
import TicketsList from "../ticketsList/index";


function Tickets({user}) {
  return (
    <div className="wrapper">
     <TicketsList user={user}/>
    </div>
  );
}
export default Tickets;
