import React from 'react';
import { useGlobalContext } from '../context';
import { convertTime, getDaylight, pressureConv, getWind } from './functions'

const Display = () => {
    const { initialRender, validLocation, currentWeather } = useGlobalContext();

/************************************************************
Currently breaks on initial render -> context first returns null
value for currentWeather and destructuring can't happen as a result
************************************************************/

    if (initialRender.current === true && validLocation.current === null) {
        console.log('initial render')
        return (
            <React.Fragment></React.Fragment>
        );
    } else if (initialRender.current === false && validLocation.current === false) {
        console.log('invalid location')
        return (
            <section>
                Please enter a valid location
            </section>
        );
    } else {
        console.log('currentWeather', currentWeather)
        // const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = currentWeather;
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
        )}
}

export default Display
