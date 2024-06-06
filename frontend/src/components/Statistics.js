import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/Statistics.css';


class Statistics extends Component {
    // Форматируем время в минуты и секунды
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Форматируем точность набора текста в процентах
    formatAccuracy(correctCount, totalCount) {
        return `${totalCount ? ((correctCount / totalCount) * 100).toFixed(2) : 0}`;
    }

    // Форматируем скорость набора текста (символов в минуту)
    formatSpeed(keyPressCount, elapsedTime) {
        return `${elapsedTime ? ((keyPressCount / elapsedTime) * 60).toFixed(2) : 0}`;
    }

    // Метод render для отображения компонента
    render() {
        const { keyPressCount, errorCount, elapsedTime } = this.props;
        const correctCount = keyPressCount - errorCount;
        const totalCount = correctCount + errorCount;

        return (
            <div className="container-fluid">
                <div className="row justify-content-end">
                    <div className="statistics d-flex justify-content-end">
                        <div className="stat-item">
                            {/* Иконка времени и отображение отформатированного времени */}
                            <FontAwesomeIcon icon={faClock} className="icon" />
                            <span className="ms-2">{this.formatTime(elapsedTime)}</span>
                        </div>
                        <div className="stat-item">
                            {/* Иконка точности и отображение отформатированной точности */}
                            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                            <span className="ms-2">{this.formatAccuracy(correctCount, totalCount)}%</span>
                        </div>
                        <div className="stat-item">
                            {/* Иконка скорости и отображение отформатированной скорости */}
                            <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                            <span className="ms-2">{this.formatSpeed(keyPressCount, elapsedTime)} C/M</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Экспортируем компонент Statistics для использования в других частях приложения
export default Statistics;