import React, { useState, useEffect } from "react";
import "./style.css";
import TicketsResult from "../ticketsResult";

function TicketsPlay({ type, param, user }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playType, setPlayType] = useState(type);
  const [playParam, setPlayParams] = useState(param);
  const [playTicketNumber, setPlayNumberTicket] = useState(0);
  const [playTicketStat, setPlayTicketStat] = useState([]);
  const [data, setData] = useState([]);
  const [playCurrentButtons, setPlayCurrentButtons] = useState();

  const getDataByType = (type, params) => {
    console.log(type);
    if (type !== "getincorrect") {
      fetch(`http://localhost:5000/questions/${type}/${params}`)
        .then((res) => res.json())
        .then(
          (result) => {
            setData(result);
            setIsLoaded(true);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      console.log(`http://localhost:5000/data/${type}/${params}`);
      fetch(`http://localhost:5000/data/${type}/${params}`)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setData(result);
            setIsLoaded(true);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const endPlay = () => {
    if (playTicketStat.length === data.length) {
      const correct = playTicketStat.filter(
        (el) => el.isCorrect === "true"
      ).length;
      const incorrect = playTicketStat.filter(
        (el) => el.isCorrect === "false"
      ).length;
      statesDebug();
      postResult();
      return (
        <TicketsResult message="" correct={correct} incorrect={incorrect} time={null}/>
      );
    }
  };

  const postResult = () => {
    console.log("POST");
    console.log(playTicketStat);
    console.log(`http://localhost:5000/data/postdata/${param}`);
    fetch(`http://localhost:5000/data/postdata/${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(playTicketStat),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getStyleColor = (bool) => {
    if (bool.toString() === "true") {
      return { backgroundColor: "#85F75E" };
    } else {
      return { backgroundColor: "#FF3C3C" };
    }
  };

  const onClickBlocks = (e) => {
    setPlayNumberTicket(e.target.getAttribute("num"));
  };

  const onClickAnswer = (e) => {
    updateStats(
      e.target.getAttribute("buttonid"),
      e.target.getAttribute("iscorrect")
    );
    updateButtons();
    statesDebug();
  };

  const statesDebug = () => {
    console.log({
      isLoaded: isLoaded,
      isCompleted: isCompleted,
      playType: playType,
      playParam: playParam,
      playTicketNumber: playTicketNumber,
      playTicketStat: playTicketStat,
      data: data,
      playCurrentButtons: playCurrentButtons,
    });
  };

  const updateStats = (clickedButton, correctHit) => {
    const dataId = data[playTicketNumber].id;
    if (playTicketStat.find((el) => el.id === dataId)) {
      const index = playTicketStat.findIndex((el) => el.id === dataId);
      const updatedElement = { ...playTicketStat[index] };
      const updatedStats = [...playTicketStat];
      if (!updatedElement.buttons.find((el) => el.button === clickedButton)) {
        updatedElement.buttons.push({ button: clickedButton, hit: correctHit });
      }
      updatedStats.splice(index, 1, updatedElement);
      setPlayTicketStat(updatedStats);
    } else {
      setPlayTicketStat([
        ...playTicketStat,
        {
          id: dataId,
          isCorrect: correctHit,
          buttons: [{ button: clickedButton, hit: correctHit }],
        },
      ]);
    }
  };

  const updateButtons = () => {
    if (findStatFromId(playTicketNumber)) {
      setPlayCurrentButtons(findStatFromId(playTicketNumber).buttons);
    }
  };

  const findStatFromId = (id) => {
    return playTicketStat.find((el) => el.id === id);
  };

  useEffect(() => {
    getDataByType(playType, playParam);
  }, []);

  const getAnswerTip = () => {
    if (findStatFromId(data[playTicketNumber].id)) {
      console.log(findStatFromId(data[playTicketNumber].id));
      return (
        <div className="playtickets__tip">
          {data[playTicketNumber].answer_tip}
        </div>
      );
    }
  };

  if (!isLoaded) {
    return <div className="playtickets">Загрузка</div>;
  } else if (data.length===0) {
    return <div>Билеты отсутствуют</div>;
  } else if (playTicketStat.length !== 0) {
    return (
      <div className="playtickets">
        <div className="playtickets__blocks">
          {data.map((el, index) => {
            if (findStatFromId(data[index].id)) {
              return (
                <button
                  id={data[index].id}
                  num={index}
                  onClick={onClickBlocks}
                  style={getStyleColor(
                    findStatFromId(data[index].id).isCorrect
                  )}
                >
                  {index + 1}
                </button>
              );
            } else
              return (
                <button id={data[index].id} num={index} onClick={onClickBlocks}>
                  {index + 1}
                </button>
              );
          })}
        </div>
        <div className="playtickets__info">
          Номер вопроса: {data[playTicketNumber].title}, Номер билета:
          {data[playTicketNumber].ticket_number}, Тема:
          {data[playTicketNumber].topic}
        </div>
        <img
          src={`http://localhost:5000/${data[playTicketNumber].image}`}
        ></img>
        <div className="playtickets__question">
          {data[playTicketNumber].question}
        </div>
        <div className="playtickets__answers">
          {data[playTicketNumber].answers.map((element, index) => {
            if (findStatFromId(data[playTicketNumber].id)) {
              if (
                findStatFromId(data[playTicketNumber].id).buttons.find(
                  (el) => el.button === index.toString()
                )
              ) {
                return (
                  <button
                    isCorrect={element.is_correct.toString()}
                    onClick={onClickAnswer}
                    buttonId={index}
                    style={getStyleColor(
                      findStatFromId(data[playTicketNumber].id).buttons.find(
                        (el) => el.button === index.toString()
                      ).hit
                    )}
                  >
                    {element.answer_text}
                  </button>
                );
              } else {
                return (
                  <button
                    isCorrect={element.is_correct.toString()}
                    onClick={onClickAnswer}
                    buttonId={index}
                  >
                    {element.answer_text}
                  </button>
                );
              }
            } else {
              return (
                <button
                  isCorrect={element.is_correct.toString()}
                  onClick={onClickAnswer}
                  buttonId={index}
                >
                  {element.answer_text}
                </button>
              );
            }
          })}
        </div>
        {getAnswerTip()}
        {endPlay()}
      </div>
    );
  } else
    return (
      <div className="playtickets">
        {()=>console.log(data) }
        <div className="playtickets__blocks">
          {data.map((el, index) => (
            <button id={data[index].id} num={index} onClick={onClickBlocks}>
              {index + 1}
            </button>
          ))}
        </div>
        <div className="playtickets__info">
          Номер вопроса: {data[playTicketNumber].title}, Номер билета: {data[playTicketNumber].ticket_number}, Тема: {data[playTicketNumber].topic}
        </div>
        <img
          src={`http://localhost:5000/${data[playTicketNumber].image}`}
        ></img>
        <div className="playtickets__question">
          {data[playTicketNumber].question}
        </div>
        <div className="playtickets__answers">
          {data[playTicketNumber].answers.map((element, index) => (
            <button
              isCorrect={element.is_correct.toString()}
              onClick={onClickAnswer}
              buttonId={index}
            >
              {element.answer_text}
            </button>
          ))}
        </div>
      </div>
    );
}
export default TicketsPlay;
