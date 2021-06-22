import React, { useState, useEffect } from "react";
import { Line, Circle } from 'rc-progress';
import "./style.css"

function Stats({user}) {
  const [stats,setStats] = useState(null);

  const exitUser = () =>{
    sessionStorage.removeItem('token');
    window.location.reload();
  }

  useEffect(() => {
    fetch(`http://localhost:5000/data/getdata/${user}`)
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result)
        setStats(result)
      },
      (error) => {
        console.log(error)
      }
    )   
  }, []);

  const createTicketsStats = () =>{
    const ticketsStats = [];
    for (let index = 1; index <=40; index++) {
     const statsOfTicket = stats.tickets.find(el=>el.ticket_number===index);
     const progressOfTicket = (statsOfTicket.correct.length===0)? 0:(statsOfTicket.correct.length/20)*100;
      ticketsStats.push(
        <div className="ticket__container">
          <h2 className="ticket__heading">Билет {index}</h2>
          <div className="ticket__correct">Правильных ответов:{statsOfTicket.correct.length}</div>
          <div className="ticket__correct">Ошибочных ответов:{statsOfTicket.incorrect.length}</div>
          <Line percent={progressOfTicket} strokeWidth="3" strokeColor="#006af2" />
        </div>
      )
    }
    return ticketsStats;
  }

  const createAllStats = () =>{
    let allTickets = 0;
    let allCorrectTickets = 0;
    let allIncorrectTickets = 0;
    let progressAll = 0;
    stats.tickets.forEach(statsElement => {
      allTickets+=statsElement.incorrect.length+statsElement.correct.length;
      allCorrectTickets+=statsElement.correct.length;
      allIncorrectTickets+=statsElement.incorrect.length;
    });
    progressAll = (allCorrectTickets/800)*100;
    return (<div className="stats__all">
      <div className="stats__element">Всего вопросов решено: {allTickets} </div>
      <div className="stats__element">Всего вопросов решено верно: {allCorrectTickets} </div>
      <div className="stats__element">Всего вопросов ошибочно: {allIncorrectTickets}</div>
      <Line percent={progressAll} strokeWidth="1" strokeColor="#006af2" />
    </div>)
  }

 if(stats!==null) {return (
    <div className="stats">

      <h3 className="stats__heading">Общая статистика:</h3>
      {createAllStats()}
      <h3 className="stats__heading">Статистика по билетам:</h3>
      <div className="stats__tickets">
      {createTicketsStats().map(el=>el)}
      </div>
      <h3 className="stats__heading">Выйти из аккаунта:</h3>
      <button onClick={exitUser}>Выйти</button>
    </div>
  );}
  else{
    return <div>Загрузка</div>
  }
}
export default Stats;
