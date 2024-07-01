import React, { Component, useContext } from 'react';
import '../css/Sidebar.css';
import LogoIcon from '../assets/logo.svg';
import trainingIcon from '../assets/training.svg';
import lessonsIcon from '../assets/lessons.svg';
import profileIcon from '../assets/profile.svg';
import leaderboardIcon from '../assets/leaderboard.svg';
import settingsIcon from '../assets/settings.svg';


export default class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <ul>
                    <li><img src={LogoIcon} alt="Тренировки" className="icon" /> </li>
                    <li><img src={trainingIcon} alt="Тренировки" className="icon" /> </li>
                    <li><img src={lessonsIcon} alt="Уроки" className="icon" /> </li>
                    <li><img src={leaderboardIcon} alt="Таблица лидеров" className="icon" /> </li>
                </ul>
                <div className="bottom-icons">
                    <ul>
                        <li><img src={settingsIcon} alt="Настройки" className="icon" /> </li>
                        <li><img src={profileIcon} alt="Профиль" className="icon" /> </li>
                    </ul>
                </div>
            </div>
        );
    }
}