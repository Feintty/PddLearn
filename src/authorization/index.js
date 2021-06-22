import React, { useState ,useEffect} from "react";
import "./style.css";

function Authorization({setUser}) {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      setLogged(sessionStorage.getItem('token'));
      setUser(sessionStorage.getItem('token'));
    }
  }, []);


  const getPopup = (message) => {
    return <div>{message}</div>;
  };

  const postRegister = () => {
    fetch(`http://localhost:5000/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        username: document.querySelector(".authorization__datafirst").value,
        password: document.querySelector(".authorization__datasecond").value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setMessage(result.message);
          if(result.hasOwnProperty('token')){
            setLogged(result.token)
            setUser(result.token)
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const postLogin = () => {
    fetch(`http://localhost:5000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        username: document.querySelector(".authorization__datafirst").value,
        password: document.querySelector(".authorization__datasecond").value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          
          setMessage(result.message);
          if(result.hasOwnProperty('token')){
            setLogged(result.token)
            setUser(result.token)
            sessionStorage.setItem('token',result.token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (isLogin)
    return (
      <div className="authorization">
        <h2 className="authorization__heading">Авторизация</h2>
        <input type="text" placeholder="Логин" className="authorization__datafirst"></input>
        <input type="password" placeholder="Пароль" className="authorization__datasecond"></input>
        <button onClick={() => postLogin()}>Авторизоваться</button>
        <div>
        <div>{message}</div>
          Еще не зарегестрированы?{" "}
          <label onClick={() => setIsLogin(false)}>Зарегестрироваться</label>
        </div>
      </div>
    );
  else
    return (
      <div className="authorization">
        <h2 className="authorization__heading">Регистрация</h2>
        <input type="text" placeholder="Логин" className="authorization__datafirst"></input>
        <input type="password" placeholder="Пароль" className="authorization__datasecond"></input>
        <button onClick={() => postRegister()}>Зарегестрироваться</button>
        <div>{message}</div>
        <div>
          Уже зарегестрированы?{" "}
          <label onClick={() => setIsLogin(true)}>Авторизоваться</label>
        </div>
      </div>
    );
}
export default Authorization;
