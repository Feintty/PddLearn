import React from "react";
import Block from "../block/index";
import imageTheory from "../img/theory.jpg";
import imageTickets from "../img/tickets.jpg"

function Main() {
  return (
    <div className="wrapper">

      <Block
        name="theory"
        heading="ИЗУЧИТЬ ТЕОРИЮ"
        subHeading="удобная форма получения знаний"
        nav="/theory"
        image={imageTheory}
        description="Изучайте теорию, выбирая из списка тем. Актуальные правила ПДД для подготовки к экзамену."
      />
      <Block
        name="tickets"
        heading="РЕШИТЬ БИЛЕТЫ"
        subHeading="узнай свой уровень подготовки"
        nav="/"
        image={imageTickets}
        description="Решайте билеты с удобным интерфейсом. Билеты доступны по темам, по номеру билета. Есть возможность прорешать как билеты с ошибками, так и 100 самых сложных."
      />
      <Block
        name="exam"
        heading="ПРОЙТИ ЭКЗАМЕН"
        subHeading="лучший способ проверить свои знания"
        nav="/"
        description="Пройдите экзамен! В случае одной ошибки в теме вам будут добавлены дополнительные 5 вопросов. Не забывайте, что экзамен проходит на время!"
      />
    </div>
  );
}
export default Main;
