import React from "react";
import Stats from "../stats/index";

function Statistics({user}) {
 return(
   <div className="wrapper">
       <Stats user={user} />
   </div>

 )
}
export default Statistics;
