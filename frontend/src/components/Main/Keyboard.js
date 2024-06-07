// Keyboard.js

import React, { useState } from 'react';
import { layouts } from './keyboardLayouts';
import '../../css/Keyboard.css';

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
                            <div
                                key={keyIndex}
                                className={`key ${key.type} f${key.finger}`}
                            >
                                <span className="main">
                                    {key.main}
                                    {key.sup && <sup className="sup">
                                        {key.sup}
                                    </sup>}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
