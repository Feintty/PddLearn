import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

function TicketsResult({ correct, incorrect, time, message }) {
  const getHeader = () => {
    if (message === "") {
      if (incorrect < 2) {
        return <h2>Успех!</h2>;
      } else {
        return <h2>Неудача!</h2>;
      }
    } else {
      if (message === "Вы успешно сдали билет!") {
        return <h2>Успех!</h2>;
      } else {
        return <h2>Неудача!</h2>;
      }
    }
  };

  const getCorrect = () => {
    return (
      <div className="result__correct"> Правильных ответов:{correct} </div>
    );
  };

  const getIncorrect = () => {
    return (
      <div className="result__incorrect">
        {" "}
        Неправильных ответов:{incorrect}{" "}
      </div>
    );
  };

  const getTime = () => {
    if (time !== null) {
      return <div className="result__time"> Время:{incorrect} </div>;
    }
  };

  return (
    <div className="result">
      <div className="result__container">
        {getHeader()}
        {message}
        {getCorrect()}
        {getIncorrect()}
        {getTime()}
        <NavLink to={"/"}>
          <button> Вернуться </button>
        </NavLink>
      </div>
    </div>
  );
}

export default TicketsResult;
