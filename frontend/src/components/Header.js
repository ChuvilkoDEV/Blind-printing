import React, { Component, useContext} from 'react';
import logo from '../img/logo.svg'
import { useParams } from "react-router";
import { Route, Routes, Link } from "react-router-dom"
import Userfront from "@userfront/toolkit/react";

const menus = [
  {name: 'Форум', href: 'forum\\',},
  {name: 'Таблица лидеров', href: 'leaderboard\\',},
  {name: 'Теория', href: 'theory\\',},
];

function MenuComponent({ menu }) {
  return <Link to={menu.href} className='link-no-underline'>{menu.name}</Link>;
}

export function Menu() {
  return <ul className="menu" >
  {menus.map((menu) => <li className="menu-item"><MenuComponent key={menu.name} menu={menu} /></li>)}
  </ul>
}

export function Image() {
  return <Link to='/'className="navbar-brand-three ">
    <img className='navbar-img' src={logo}></img>
  </Link>
}


export function Profile() {
  const userData = JSON.stringify(Userfront.user, null, 2);
  if (userData.length === 2)
    return (
      <div>
        <Link to='login/' className='link-no-underline'>Войти</Link>
        <Link to='register/' className='btn btn-dark'>Регистрация</Link>
      </div>
      );
  else
    return (
      <div>
        <div>{Userfront.user.username}</div>
        <button onClick={Userfront.logout}>Logout</button>
      </div>
    );
}

export default class Header extends Component {
  render() {
    return (
      <header class="row text-center">
          <div className='col-5'><Menu /></div>
          <div className='col-2'><Image /></div>
          <div className='col-5'><Profile /></div>
      </header>
    );
  }
}
