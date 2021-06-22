import React from "react";
import "./style.css";

function TheoryList({ setId, setParams, hasHeading }) {

  const listElementClick = (e) =>{
    if(setId)
    setId(Number(e.target.getAttribute("num")));
    if(setParams)
    setParams(e.target.innerText);
  }

  return (
    <div className="theorylist">
      {hasHeading?<h3  className="theorylist__heading">Темы:</h3>:null}
    <ol type="1" className="theorylist__list">
      <li num="1" onClick={listElementClick}>Общие положения</li>
      <li num="2" onClick={listElementClick}>Общие обязанности водителей</li>
      <li num="3" onClick={listElementClick}>Применение специальных сигналов</li>
      <li num="4" onClick={listElementClick}>Обязанности пешеходов</li>
      <li num="5" onClick={listElementClick}>Обязанности пассажиров</li>
      <li num="6" onClick={listElementClick}>Сигналы светофора и регулировщика</li>
      <li num="7" onClick={listElementClick}>Применение аварийной сигнализации и знака аварийной остановки</li>
      <li num="8" onClick={listElementClick}>Начало движения, маневрирование</li>
      <li num="9" onClick={listElementClick}>Расположение транспортных средств на проезжей части</li>
      <li num="10" onClick={listElementClick}>Скорость движения</li>
      <li num="11" onClick={listElementClick}>Обгон, опережение, встречный разъезд</li>
      <li num="12" onClick={listElementClick}>Остановка и стоянка</li>
      <li num="13" onClick={listElementClick}>Проезд перекрестков</li>
      <li num="14" onClick={listElementClick}>
        Пешеходные переходы и места остановок маршрутных транспортных средств
      </li>
      <li num="15" onClick={listElementClick}>Движение через железнодорожные пути</li>
      <li num="16" onClick={listElementClick}>Движение по автомагистралям</li>
      <li num="17" onClick={listElementClick}>Движение в жилых зонах</li>
      <li num="18" onClick={listElementClick}>Приоритет маршрутных транспортных средств</li>
      <li num="19" onClick={listElementClick}>Пользование внешними световыми приборами и звуковыми сигналами</li>
      <li num="20" onClick={listElementClick}>Буксировка механических транспортных средств</li>
      <li num="21" onClick={listElementClick}>Учебная езда</li>
      <li num="22" onClick={listElementClick}>Перевозка людей</li>
      <li num="23" onClick={listElementClick}>Перевозка грузов</li>
      <li num="24" onClick={listElementClick}>
        Дополнительные требования к движению велосипедистов и водителей мопедов
      </li>
      <li num="25" onClick={listElementClick}>
        Дополнительные требования к движению гужевых повозок, а также к прогону
        животных
      </li>
    </ol>
    </div>
  );
}

export default TheoryList;
