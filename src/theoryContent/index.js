import React from "react";
import "./style.css";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";

function TheoryContent({ id, setId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);


  useEffect(() => {
    setIsLoaded(false);
    setError(null);
    setTimeout(() => {
      getTheory(id);
    }, 500);
  }, [id]);

  const getTheory = async (number) => {
    fetch(`http://localhost:5000/theorydata/${number}.txt`)
      .then((res) => res.text())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="theorycontent">
        <h3 className="theorycontent__heading">Теория:</h3>
        <div className="theorycontent__buttons">
          <button className="theorycontent__button inactive-button">
            Назад
          </button>
          <button className="theorycontent__button inactive-button">
            Вперед
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="theorycontent">
        <h3 className="theorycontent__heading">Теория:</h3>
        <div className="theorycontent__buttons">
          <button className="theorycontent__button active-button"
            onClick={() => {
              if (id > 1) {
                setId(Number(id) - 1);
                setIsLoaded(false);
                setError(null);
              }
            }}
          >
            Назад
          </button>
          <button className="theorycontent__button active-button"
            onClick={() => {
              if (id < 25) {
                setId(Number(id) + 1);
                setIsLoaded(false);
                setError(null);
              }
            }}
          >
            Вперед
          </button>
        </div>

        <ReactMarkdown>{items}</ReactMarkdown>
      </div>
    );
  }
}

export default TheoryContent;
