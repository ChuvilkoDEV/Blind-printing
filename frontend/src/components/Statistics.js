import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTachometerAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/Statistics.css';

class Statistics extends Component {
    // Format time
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Format typing speed
    formatSpeed(keyPressCount, elapsedTime) {
        return `${((keyPressCount / elapsedTime) * 60).toFixed(2)}`;
    }

    // Format accuracy
    formatAccuracy(correctCount, totalCount) {
        return `${((correctCount / totalCount) * 100).toFixed(2)}%`;
    }

    render() {
        const { keyPressCount, errorCount, elapsedTime } = this.props;
        const correctCount = keyPressCount - errorCount;
        const totalCount = correctCount + errorCount;

        return (
            <div className="container-fluid">
                <div className="row justify-content-end">
                    <div className="statistics d-flex justify-content-end">
                        <div className="stat-item">
                            <FontAwesomeIcon icon={faClock} />
                            <span className="ms-2">{this.formatTime(elapsedTime)}</span>
                        </div>
                        <div className="stat-item">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span className="ms-2">{this.formatAccuracy(correctCount, totalCount)}</span>
                        </div>
                        <div className="stat-item">
                            <FontAwesomeIcon icon={faTachometerAlt} />
                            <span className="ms-2">{this.formatSpeed(keyPressCount, elapsedTime)} chars/min</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;
