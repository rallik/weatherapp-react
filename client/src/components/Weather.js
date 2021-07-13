import React from 'react';
import { useGlobalContext } from '../context';
import { roundTemp, pressureConv, getWind } from './functions';
import LocTime from './LocTime'

const Weather = () => {
    const { currentWeather } = useGlobalContext();
    console.count('context - currentWeather')
    console.log(currentWeather)
    const { clouds, main, weather, wind } = currentWeather;
    const { humidity } = main;
    // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
    // console.log(currentWeather)
    
    // console.log(sunrise, sunset)


    const temp = roundTemp(main.temp);
    const feels_like = roundTemp(main.feels_like)
    const temp_min = roundTemp(main.temp_min)
    const temp_max = roundTemp(main.temp_max)

    const pressure_rnd = pressureConv(main.pressure);
    // console.log(pressure_rnd)
    const { speed, direction } = getWind(wind);
    // console.log(wind)

    // console.log(clouds)
    return (
        <React.Fragment>
            <section className='weather'>
                <LocTime/>

                <div className='conditions'>
                    
                    <div className="current-temp">
                        {/* <h4 className='current-temp-h'>Current Temp: </h4> */}
                        <p className='current-temp-d'>{temp}°F</p>
                    </div>

                    <div className="current-w space">
                    {
                        weather.map((w) => {
                            return (
                                <h3 key={w.id} className='current-w-d'>{w.description}</h3>
                            );
                        })
                    }
                    </div>

                    <div className="row-one">
                        <div className="feels-like third">
                            <h4 className='feels-like-h small'>Feels like: </h4>
                            <p className='feels-like-d small space'>{feels_like}°F</p>
                        </div>
                        
                        <div className="humidity third">
                            <h4 className='humidity-h small'>Humidity: </h4>
                            <p className='humidity-d small space'>{humidity} %</p>
                        </div>

                        <div className="pressure third">
                            <h4 className='pressure-h small'>Pressure: </h4>
                            <p className='pressure-d small space'>{pressure_rnd} inHg</p>
                        </div>
                    </div>

                    <div className="row-two">
                        <div className="wind half">
                            <h4 className='wind-h small'>Wind: </h4>
                            <p className='wind-d small space'>{speed} mph {direction}</p>
                        </div>

                        <div className="clouds half">
                            <h4 className='clouds-h small'>Clouds: </h4>
                            <p className='clouds-d small space'>{clouds.all}</p>
                        </div>
                    </div>
                </div>
            </section>
            

            
        </React.Fragment>
    )
}

export default Weather
