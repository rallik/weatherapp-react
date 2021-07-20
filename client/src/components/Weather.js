import React from 'react';
import { useGlobalContext } from '../context';
import { roundTemp, pressureConv, getWind } from '../utils/functions';
import LocTime from './LocTime'

const Weather = () => {
    const { currentWeather } = useGlobalContext();
    // console.count('context - currentWeather')
    // console.log(currentWeather)

    const { clouds, main, weather, wind } = currentWeather;
    const { humidity } = main;
    const temp = roundTemp(main.temp);
    const feels_like = roundTemp(main.feels_like)
    const pressure_rnd = pressureConv(main.pressure);
    const { speed, direction } = getWind(wind);

    return (
        <React.Fragment>
            <div className='weather'>
                <LocTime/>

                <div className='conditions'>
                    <div className='temp-conditions'>
                        <div className="current-temp">
                            <p className='current-temp-d'>{temp}°F</p>
                        </div>
                        <div className="current-w space-top">
                        {
                            weather.map((w) => {
                                return (
                                    <h3 key={w.id} className='current-w-d'>{w.description}</h3>
                                );
                            })
                        }
                        </div>
                    </div>

                    <div className='conditions-table'>
                        <div className="row-one">
                            <div className="feels-like">
                                <h4 className='feels-like-h'>Feels like</h4>
                                <p className='feels-like-d space-left'>{feels_like}°F</p>
                            </div>
                            <div className="humidity">
                                <h4 className='humidity-h'>Humidity</h4>
                                <p className='humidity-d space-left'>{humidity} &#37;</p>
                            </div>
                            <div className="pressure">
                                <h4 className='pressure-h'>Pressure</h4>
                                <p className='pressure-d space-left'>{pressure_rnd} inHg</p>
                            </div>
                        </div>

                        <div className="row-two">
                            <div className="wind">
                                <h4 className='wind-h'>Wind</h4>
                                <p className='wind-d space-left'>{speed} mph {direction}</p>
                            </div>
                            <div className="clouds">
                                <h4 className='clouds-h'>Clouds</h4>
                                <p className='clouds-d space-left'>{clouds.all} &#37;</p>
                            </div>
                            <div>
                                <h4></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Weather
