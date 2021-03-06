import React from 'react'
import SunSched from './SunSched'
import { useGlobalContext } from '../context';
import { time } from '../utils/time';

const LocTime = () => {
    const { currentWeather: { dt, sys, timezone, coord, name } } = useGlobalContext();
    const location_time = time(dt, timezone);
    
    return (
        <div className="loc-time">
            <h1 className='city'>{name}</h1>
            <div className='time-updated'>
                <h4>Last Updated:&nbsp;</h4>
                <p>{location_time.time_display}</p>
            </div>
            <SunSched props={{ sys, coord, location_time, timezone }} />
        </div>
    )
}

export default LocTime

