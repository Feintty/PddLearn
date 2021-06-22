import React from "react";
import "./style.css";
import {NavLink} from "react-router-dom"

function Header({user}) {
  const navToggle = () =>{
    if(user!==false){
      return <h2 className="header__nav-element"><NavLink to={"/stats"} onClick={onClickBurger}>Мой профиль</NavLink></h2>
    }else{
      return <h2 className="header__nav-element"><NavLink to={"/auth"} onClick={onClickBurger}>Войти</NavLink></h2>
    }
  }

 const onClickBurger = () =>{
  document.querySelector(".header__nav").classList.toggle("hide");
  }

  return (
    <header className="header">
      <h1 className="header__logo">PDDLearn</h1>
      <h2 className="header__burger" onClick={onClickBurger}>Меню</h2>
      <nav className="header__nav hide">
        <h2 className="header__nav-element"><NavLink to={"/"} onClick={onClickBurger} >Главная</NavLink></h2>
        <h2 className="header__nav-element"><NavLink to={"/exam"}  onClick={onClickBurger}>Экзамен</NavLink></h2>
        <h2 className="header__nav-element"><NavLink to={"/tickets"}  onClick={onClickBurger}>Билеты</NavLink></h2>
        <h2 className="header__nav-element"><NavLink to={"/theory"}  onClick={onClickBurger}>Теория</NavLink></h2>
        { navToggle()}
      </nav>
    </header>
  );
}
export default Header;