import React, { Component } from 'react';
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
                    <li>
                        <img src={LogoIcon} alt="Логотип" className="icon" />
                        <span className="text">Логотип</span>
                    </li>
                    <li>
                        <img src={trainingIcon} alt="Тренировки" className="icon" />
                        <span className="text">Тренировки</span>
                    </li>
                    <li>
                        <img src={lessonsIcon} alt="Уроки" className="icon" />
                        <span className="text">Уроки</span>
                    </li>
                    <li>
                        <img src={leaderboardIcon} alt="Таблица лидеров" className="icon" />
                        <span className="text">Таблица лидеров</span>
                    </li>
                </ul>
                <div className="bottom-icons">
                    <ul>
                        <li>
                            <img src={settingsIcon} alt="Настройки" className="icon" />
                            <span className="text">Настройки</span>
                        </li>
                        <li>
                            <img src={profileIcon} alt="Профиль" className="icon" />
                            <span className="text">Профиль</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
