import React from 'react';
import { useGlobalContext } from '../context';
// import { convertTime, getDaylight, pressureConv, getWind } from './functions';

const Weather = () => {
    const { currentWeather } = useGlobalContext();
    console.count('context - currentWeather')
    console.log(currentWeather)
    // const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
    // const { temp, feels_like, pressure, humidity, temp_min, temp_max, sea_level, grnd_level } = main;
    // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
    // console.log(currentWeather)
    // const time = convertTime(dt);
    // console.log(time)
    // const { sunrise, sunset } = getDaylight(sys);
    // console.log(sunrise, sunset)
    // const pressure_rnd = pressureConv(main.pressure);
    // console.log(pressure_rnd)
    // const { speed, direction } = getWind(wind);
    // console.log(wind)

    return (
        <div>
            
        </div>
    )
}

export default Weather
