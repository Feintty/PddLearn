import React from "react";
import "./style.css";
import {NavLink} from "react-router-dom"

function Block(props) {
  return (
    <article className={props.name}>
      <div className={`${props.name}__head`}>
        <h2>{props.heading}</h2>
        <h3>{props.subHeading}</h3>
      </div>
      <section className={`${props.name}__section`}>
        <img src = {props.image}></img>
        <div className={`${props.name}__description`}>{props.description}</div>
      </section>
      <button className={`${props.name}__btn`}>
        <NavLink to={props.nav}>
        <h3>{props.heading}</h3>
        </NavLink>  
      </button>
    </article>
  );
}
export default Block;
