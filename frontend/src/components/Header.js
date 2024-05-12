import React, { Component, useContext} from 'react';
import logo from '../img/logo.svg'
import { useParams } from "react-router";
import { Route, Routes, Link } from "react-router-dom"

const menus = [
  {
    name: 'Форум',
    href: 'forum\\',
  },
  {
    name: 'Таблица лидеров',
    href: 'leaderboard\\',
  },
  {
    name: 'Практика',
    href: 'practice\\',
  },
  {
    name: 'Теория',
    href: 'theory\\',
  },
];

function MenuComponent({ menu }) {
  return <a href={menu.href} className='menu'>{menu.name}</a>;
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
  // const { isAuthenticated } = useContext(AuthContext);
  // if (isAuthenticated === true) {
  //   // const { username } = useParams();
  //   // return (<>{username} | <a href='/users/logout/' className='logout'></a></>)
  // } else {
  //   // перенаправляем пользователя на страницу входа [1](https://danshin.ms/simple-login-react-app/)
  // }
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
