import React, {useEffect, useState, useRef} from 'react';
import {colorTemperatureToRGB} from './lib/colorTempToRGB';
import './App.css';

//From https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const text1850 =
    `Welcome to a tour of color temperature!
    Wait, what is color temperature? 
    Color temperature is the temperature at which a black body radiates light of this color.
    I know you are not here for a physics lesson. So lets get started.
    Please turn up your screen brightness for best experience.
    What you see now is the color temperature of candle light.
    `.split('\n');
const text2400 =
    `Now incandescent light we used back in the old days.
     You should feel comfortable and relaxed looking at low color temperatures (aka. warmer colors), especially at night.
    `.split('\n');
const text2700 =
    `High pressure sodium streetlight.
    We mainly used them before LED streetlights.
    `.split('\n');
const text3000 =
    `Maximum color temperature for streetlights according to AMA's recommendation.
    Wait, but why?
    When we go to higher color temperatures, there is more blue light.
    And blue light has many adverse effects at night.
    Especially to our health and to the ecosystem. 
    You will see why soon.
    `.split('\n');
const text4100 =
    `Moonlight.
    This is how far nature goes in terms of color temperature at night.
    Many species used the moon and the stars to navigate at night for millions, or perhaps billions of years.
    And then, artificial lights intrude into nature.
    `.split('\n');
const text5000 =
    `Sunlight. 
    You should not see sunlight at night. Neither should the ecosystem.
    Yet, this is not where we stopped.
    `.split('\n');
const text6500 =
    `LED streetlight.
    I know you feel very uncomfortable right now. Lets continue! 
    `.split('\n');
const text_decrease =
    `Excessive blue light at night makes us feel uncomfortable and stressed, as you just see.
     It disrupts our sleep cycle and leads to many long-term health problems.
     It causes glare that reduces our ability to see at night, imposing safety risks.
     It hinders animals' ability to navigate which can lead to major decrease in population.
     It scatters in the atmosphere and cause Skyglow, blocking light from the stars.
     And the list goes on...
    `.split('\n')
const text1500 =
    `I hope you enjoyed this tour (except the 6500K part)
    And thank you to being conscious about light pollution.
    Choose light that are not too bright, shields, and warm at night!
    `.split('\n');

function App() {
    const [targetTemp, setTargetTemp] = useState(1850);
    const [temp, setTemp] = useState(1850);
    const [page, setPage] = useState(0);
    const [delay, setDelay] = useState(3e8);
    const [disc, setDisc] = useState(text1850);
    const [discBuffer, setDiscBuffer] = useState('');
    const [change, setChange] = useState(false);
    const [slider, setSlider] = useState(false);

    useInterval(() => {
        if (!slider) {
            if (temp < targetTemp) {
                setTemp(temp + 2);
            } else if (temp > targetTemp) {
                setTemp(temp - 2);
            } else {
                if (change) {
                    setChange(false);
                    setDelay(3e8);
                    setDisc(discBuffer);
                    switch (temp) {
                        case 1500:
                            setSlider(true);
                            break;
                        default:
                    }
                }
            }
        }
    }, delay)


    function buttonClicked() {
        if (!change) {
            switch (page) {
                case 0:
                    setTargetTemp(2400);
                    setDisc([]);
                    setDiscBuffer(text2400);
                    setChange(true);
                    setDelay(15);
                    break;
                case 1:
                    setTargetTemp(2700);
                    setDisc([]);
                    setDiscBuffer(text2700);
                    setChange(true);
                    setDelay(15);
                    break;
                case 2:
                    setTargetTemp(3000);
                    setDisc([]);
                    setDiscBuffer(text3000);
                    setChange(true);
                    setDelay(15);
                    break;
                case 3:
                    setTargetTemp(4100);
                    setDisc([]);
                    setDiscBuffer(text4100);
                    setChange(true);
                    setDelay(10);
                    break;
                case 4:
                    setTargetTemp(5000);
                    setDisc([]);
                    setDiscBuffer(text5000);
                    setChange(true);
                    setDelay(15);
                    break;
                case 5:
                    setTargetTemp(6500);
                    setDisc([]);
                    setDiscBuffer(text6500);
                    setChange(true);
                    setDelay(5);
                    break;
                case 6:
                    setTargetTemp(1500);
                    setDisc(text_decrease);
                    setDiscBuffer(text1500);
                    setChange(true);
                    setDelay(10);
                    break;
                default:
            }
            setPage(page + 1);
        }
    }

    let rgb = colorTemperatureToRGB(temp);

    let disc_bred = disc.map((d) => {
        return (
            <span>
                {d} <br />
            </span>
        );
    })

    return (
        <div className="App">
            <div className="App-header" style={{background : `rgb(${rgb.r},${rgb.g},${rgb.b})` }}>
                <span className="k-meter">{temp}K</span>
                <div className="control">
                    <div className="disc">{disc_bred}</div>
                    <div className="slideContainer" style={slider ? {} : {opacity: 0}}>
                        <input type="range" min="1000" max="6500" className="slider"
                               id="myRange" value={temp} onChange={(event) => {setTemp(parseInt(event.target.value))}}
                               disabled={!slider} />
                    </div>
                    <button onClick={buttonClicked} disabled={slider} style={slider ? {opacity: 0} : {}}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default App;