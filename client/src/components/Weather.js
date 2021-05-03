import React from 'react';
import { useGlobalContext } from '../context';
import { convertTime, getDaylight, roundTemp, pressureConv, getWind } from './functions';

const Weather = () => {
    const { currentWeather } = useGlobalContext();
    console.count('context - currentWeather')
    console.log(currentWeather)
    const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
    const { humidity } = main;
    // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
    // console.log(currentWeather)
    const { t_display } = convertTime(dt, timezone);
    // console.log(time)
    const { sunrise, sunset } = getDaylight(sys, timezone);
    // console.log(sunrise, sunset)

    const temp = roundTemp(main.temp);
    const feels_like = roundTemp(main.feels_like)
    const temp_min = roundTemp(main.temp_min)
    const temp_max = roundTemp(main.temp_max)

    const pressure_rnd = pressureConv(main.pressure);
    // console.log(pressure_rnd)
    const { speed, direction } = getWind(wind);
    // console.log(wind)

    console.log(clouds)
    return (
        <React.Fragment>
            <section className='weather'>
                <h1 className='city'>{name}</h1>
                <div className="time">
                    <h4 className='time-h'>Last Updated:</h4>
                    <p className='time-d'>{t_display}</p>
                    <h4 className='sun-r-h'>Sunrise</h4>
                    <p className='sun-r-d'>{sunrise}</p>
                    <h4 className='sun-s-h'>Sunset</h4>
                    <p className='sun-s-d'>{sunset}</p>
                </div>

                <div className='conditions'>
                    <h3 className='cond'>Conditions</h3>
                    {
                        weather.map((w) => {
                            // const id = () => new Date().getTime.toString();
                            return (
                                <p key={w.id} className='current-w-d'>{w.description}</p>
                            );
                        })
                    }

                    <h4 className='current-temp-h'>Current Temp: </h4>
                    <p className='current-temp-d'>{temp}°F</p>

                    <h4 className='feels-like-h'>Feels like: </h4>
                    <p className='feels-like-d'>{feels_like}°F</p>
                    
                    <h4 className='humidity-h'>Humidity: </h4>
                    <p className='humidity-d'>{humidity} %</p>

                    <h4 className='pressure-h'>Pressure: </h4>
                    <p className='pressure-d'>{pressure_rnd} inHg</p>

                    <h4 className='wind-h'>Wind Speed/Direction: </h4>
                    <p className='wind-d'>{speed} mph {direction}</p>

                    <h4 className='clouds-h'>Clouds: </h4>
                    <p className='clouds-d'>{clouds.all}</p>
                </div>
            </section>
            

            
        </React.Fragment>
    )
}

export default Weather
