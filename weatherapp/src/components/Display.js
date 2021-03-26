import React from 'react';
import { useGlobalContext } from '../context';
import { convertTime, getDaylight, pressureConv, getWind } from './functions'

const Display = () => {
    const { currentWeather } = useGlobalContext();

/************************************************************
Currently breaks on initial render -> context first returns null
value for currentWeather and destructuring can't happen as a result
************************************************************/



    const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
    // const { temp, feels_like, pressure, humidity, temp_min, temp_max, sea_level, grnd_level } = main;
    // // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
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
        <React.Fragment>
            <section className='clouds'>
                <h2>Cloud Cover %</h2>
                {/* <h3>{clouds.all}</h3> */}
            </section>
            <section className=''>

            </section>
        </React.Fragment>
    )
}

export default Display
