import React from 'react'
import SunCalc from 'suncalc';
import SunSched from './SunSched'
import { useGlobalContext } from '../context';
import { convertTime, getDaylight} from './functions';

const Time = () => {
    const { currentWeather: { dt, sys, timezone, coord } } = useGlobalContext();
    const { t_display, date, day } = convertTime(dt, false);
    
    return (
        <div className="time">
            <h4 className='time-h'>Last Updated:</h4>
            <p className='time-d'>{t_display}</p>
            <SunSched props={{date, day, sys, coord, timezone}} />
        </div>
    )
}

export default Time
