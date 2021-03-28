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
    const { t_display } = convertTime(dt);
    // console.log(time)
    const { sunrise, sunset } = getDaylight(sys);
    // console.log(sunrise, sunset)

    const temp = roundTemp(main.temp);
    const feels_like = roundTemp(main.feels_like)
    const temp_min = roundTemp(main.temp_min)
    const temp_max = roundTemp(main.temp_max)

    const pressure_rnd = pressureConv(main.pressure);
    // console.log(pressure_rnd)
    const { speed, direction } = getWind(wind);
    // console.log(wind)

    return (
        <React.Fragment>
            <section className='cityInfo'>
                <h2>{name}</h2>
                <h4>Time</h4>
                <p>{t_display}</p>
                <h4>Sunrise / Sunset</h4>
                <p>{sunrise} / {sunset}</p>
            </section>
            <section className='daylight'>

            </section>
            <section className='conditions'>
                <h3>Conditions</h3>
                <h4>Current Temp: </h4>
                <p>{temp}°F</p>
                <h4>Min / Max: </h4>
                <p>{temp_min}°F / {temp_max}°F</p>
                


                <h4>Feels like: </h4>
                <p>{feels_like}°F</p>
                <h4>Humidity: </h4>
                <p>{humidity} %</p>
                <h4>Pressure: </h4>
                <p>{pressure_rnd} inHg</p>
                <h4>Wind Speed/Direction: </h4>
                <p>{speed} mph {direction}</p>
                <h4>Clouds: </h4>
                <p>{clouds}</p>

                <h4>Weather</h4>
                {
                    weather.map((w) => {
                        const id = new Date().getTime.toString()
                        return (
                            <p key={id}>{w.description}</p>
                        );
                    })
                }
            </section>

            
        </React.Fragment>
    )
}

export default Weather
