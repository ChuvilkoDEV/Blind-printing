// Keyboard.js

import React, { useState } from 'react';
import { layouts } from './keyboardLayouts';
import '../../css/Keyboard.css'; // Создайте и подключите CSS файл для стилей

const Keyboard = () => {
    const [currentLayout, setCurrentLayout] = useState('йцукен');

    const handleLayoutChange = (layout) => {
        setCurrentLayout(layout);
    };

    return (
        <div id="keyboard" className="keyboard">
            <div id="layout_sel" className="wind_sel popup-hide">
                <span className="close"></span>
                <div className="list">
                    {Object.keys(layouts).map((layout) => (
                        <div key={layout}>
                            <a href={`#${layout}`} className="link" onClick={() => handleLayoutChange(layout)}>
                                {layout}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <span id="layout" className="select" title="Раскладка клавиатуры">
                <a href="#layout" className="link-2">{currentLayout}</a>
            </span>
            <div className="keys" id="standart">
                {layouts[currentLayout].map((line, index) => (
                    <div className="line" key={index}>
                        {line.map((key, keyIndex) => (
                            <div key={keyIndex} className={`key ${key.length > 1 ? 'sup' : ''}`}>
                                {key}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
