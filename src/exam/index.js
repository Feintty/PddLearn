import React, { useState, useEffect } from "react";
import "./style.css";
import TicketsResult from "../ticketsResult";

function Exam({ user }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStarted, setIsStartd] = useState(false);
  const [playTicketNumber, setPlayNumberTicket] = useState(0);
  const [playTicketStat, setPlayTicketStat] = useState([]);
  const [data, setData] = useState([]);
  const [playCurrentButtons, setPlayCurrentButtons] = useState();
  const [playTime, setPlayTime] = useState({ seconds: 0, minutes: 0 });
  const [incorrectCategory, setIncorrectCategory] = useState([]);
  const [result, setResult] = useState("");

  const addResult = () => {
    if (playTicketStat.length > 20) {
      const addedQuestions = playTicketStat.slice(20);
      if (
        addedQuestions.filter(
          (playTicketStatElement) => playTicketStatElement.isCorrect === "false"
        )
      ) {
        return("Нельзя ошибаться в дополнительных вопросах!");
      }
    } else if (incorrectCategory.length > 2) {
      return("Допущенно слишком много ошибок!");
    } else if (
      incorrectCategory.length !== Array.from(new Set(incorrectCategory)).length
    ) {
      return("Вы допустили несколько ошибок по одной теме!");
    } else if (playTime.minutes > 20) {
      return("Время вышло!");
    } else {
      return("Вы успешно сдали билет!");
    }
  };

  const getDataByType = (type, params) => {
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
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const endPlay = () => {
    if (playTicketStat.length === data.length) {
      const correct = playTicketStat.filter(
        (el) => el.isCorrect === "true"
      ).length;
      const incorrect = playTicketStat.filter(
        (el) => el.isCorrect === "false"
      ).length;
      postResult();
      return (
        <TicketsResult
          message={addResult()}
          correct={correct}
          incorrect={incorrect}
          time={null}
        />
      );
    }
  };

  const getStyleColor = (bool) => {
    if (bool.toString() === "true") {
      return { backgroundColor: "green" };
    } else {
      return { backgroundColor: "red" };
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
  };

  const postResult = () => {
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
          category: data[playTicketNumber].topic,
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
    if (isStarted)
      setTimeout(() => {
        if (playTime.seconds + 1 === 60) {
          setPlayTime({ seconds: 0, minutes: playTime.minutes + 1 });
        } else {
          setPlayTime({
            seconds: playTime.seconds + 1,
            minutes: playTime.minutes,
          });
        }
      }, 1000);
  }, [playTime, isStarted]);

  useEffect(() => {
    getDataByType("questionsBySet", getRandomInt(40));
  }, []);

  useEffect(() => {
    console.log(playTicketStat);
    if (
      playTicketStat.length > 0 &&
      playTicketStat[playTicketStat.length - 1].isCorrect == "false" &&
      data.length!==playTicketStat.length
    ) {
      if (
        incorrectCategory.includes(
          playTicketStat[playTicketStat.length - 1].category
        )
      ) {
        setIncorrectCategory([
          ...incorrectCategory,
          playTicketStat[playTicketStat.length - 1].category,
        ]);
      } else if (incorrectCategory.length < 2) {
        console.log("INCORRECT");
        console.log(incorrectCategory);
        setIncorrectCategory([
          ...incorrectCategory,
          playTicketStat[playTicketStat.length - 1].category,
        ]);
        addAdditionalQuestions(
          playTicketStat[playTicketStat.length - 1].category,
          playTicketStat[playTicketStat.length - 1].id
        );
      } else {
        setIncorrectCategory([
          ...incorrectCategory,
          playTicketStat[playTicketStat.length - 1].category,
        ]);
      }
    }
  }, [playTicketStat]);

  const addAdditionalQuestions = (category) => {
    fetch(
      `http://localhost:5000/questions/questionsAdditional/${category}`,{
        method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setData([...data, ...result]);
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getAnswerTip = () => {
    if (findStatFromId(data[playTicketNumber].id)) {
      return (
        <div className="playtickets__tip">
          {data[playTicketNumber].answer_tip}
        </div>
      );
    }
  };

  if (!isStarted) {
    return (
      <div className="playexam">
        <h2 className="playexam__heading">Экзамен</h2>
        <div className="playexam__discription">
          Для того чтобы начать экзамен нажмите "Начать" ниже. После нажатия
          запустится таймер.
        </div>
        <button
          onClick={() => {
            setIsStartd(true);
          }}
        >
          Начать
        </button>
      </div>
    );
  } else if (!isLoaded) {
    return <div className="playtickets">Загрузка</div>;
  } else if (playTicketStat.length !== 0) {
    return (
      <div className="playtickets">
        <div className="playtickets__time">
          {playTime.minutes}:{playTime.seconds}
        </div>
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
          Номер вопроса:{data[playTicketNumber].title} Номер билета:{" "}
          {data[playTicketNumber].ticket_number} Тема:{" "}
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
        <div className="playtickets__time">
          {playTime.minutes}:{playTime.seconds}
        </div>
        <div className="playtickets__blocks">
          {data.map((el, index) => (
            <button id={data[index].id} num={index} onClick={onClickBlocks}>
              {index + 1}
            </button>
          ))}
        </div>
        <div className="playtickets__info">
          Номер вопроса:{data[playTicketNumber].title} Номер билета:{" "}
          {data[playTicketNumber].ticket_number} Тема:{" "}
          {data[playTicketNumber].topic}
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
export default Exam;
