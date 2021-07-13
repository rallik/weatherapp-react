import React from 'react'
import SunSched from './SunSched'
import { useGlobalContext } from '../context';
import { convertTime } from './functions';

const Time = () => {
    const { currentWeather: { dt, sys, timezone, coord } } = useGlobalContext();
    const location_time = convertTime(dt, false, timezone);
    
    return (
        <div className="time">
            <h4 className='time-updated'>Last Updated:&nbsp;</h4>
            <p className='time-updated'>{location_time.t_display}</p>
            <SunSched props={{ sys, coord, location_time, timezone }} />
        </div>
    )
}

export default Time

