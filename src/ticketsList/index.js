import React, { useState } from "react";
import "./style.css";
import TheoryList from "../theoryList/index";
import Play from "../pages/play";

function TicketsList({ user }) {
  const [params, setParams] = useState(null);
  const [type, setType] = useState(null);

  const createTicketButtons = () => {
    const items = [];
    for (let index = 1; index <= 40; index++) {
      items.push(
        <button id={index} type="questionsBySet" onClick={onClickNumber}>
          {index}
        </button>
      );
    }
    return items;
  };

  const onClickNumber = (e) => {
    setParams(e.target.getAttribute("id"));
    setType(e.target.getAttribute("type"));
  };

  const onClickCategory = (innerText) => {
    setParams(innerText);
    setType("questionsByCategory");
  };

  const onClickWrong = ()=>{
    setParams(user);
    setType("getincorrect");
  }

  if (type === null && params === null) {
    return (
      <div>
        <div className="tickets__number">
          <h3 className="tickets__heading">По билетам:</h3>
          <div className="tickets__numbers">
          {createTicketButtons()}
          </div>      
        </div>
        <div className="tickets__category">
          <h3 className="tickets__heading-category">По категориям:</h3>
        </div>
        <TheoryList setParams={onClickCategory} />
        <div className="tickets__hard">
        <h3 className="tickets__heading">Сложные вопросы:</h3>
          <button>Топ 100 сложных</button>
        </div>
        <div className="tickets__wrong">
        <h3 className="tickets__heading">Вопросы с ошибками:</h3>
          {user!==false ? (
            <button onClick={onClickWrong}>Вопросы с ошибками</button>
          ) : (
            <div>
              Авторизуйтесь, чтобы решать вопросы с ошибками и отслеживать
              статистику
            </div>
          )}
        </div>
      </div>
    );
  } else {
    console.log("TYPE PARAM"+type,params)
    return <Play type={type} param={params} isExam={false} user={user} />;
  }
}

export default TicketsList;
