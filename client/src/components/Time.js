import React from 'react'
import SunSched from './SunSched'
import { useGlobalContext } from '../context';
import { convertTime } from './functions';

const Time = () => {
    const { currentWeather: { dt, sys, timezone, coord } } = useGlobalContext();
    const { t_display, date, day } = convertTime(dt, false);
    
    return (
        <div className="time">
            <h4 className='time-updated'>Last Updated:&nbsp;</h4>
            <p className='time-updated'>{t_display}</p>
            <SunSched props={{date, day, sys, coord, timezone}} />
        </div>
    )
}

export default Time

