import React, { useState } from "react";
import TheoryList from "../theoryList/index";
import TheoryElement from "../theoryContent/index";

function Theory() {
  const [currentId,setCurrentId] = useState(1);
  return (
    <div className="wrapper">
      <TheoryList setId={setCurrentId} hasHeading={true}/>
      <TheoryElement id={currentId} setId={setCurrentId} />
    </div>
  );
}
export default Theory;
