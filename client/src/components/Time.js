import React from 'react'
import SunCalc from 'suncalc';
import { useGlobalContext } from '../context';
import { convertTime, getDaylight} from './functions';

const Time = () => {
    const { currentWeather: { dt, sys, timezone, coord } } = useGlobalContext();
    const { t_display, date, day } = convertTime(dt, false);
    const { sunrise, sunset } = getDaylight(sys);

    //suncalc
    let yesterday = date;
    let today = date;
    let tomorrow = date;


    const noon = new Date(today.setHours(12, 0, 0));
    const noontomorrow = new Date(tomorrow.setHours(12, 0, 0)).setDate(day + 1);
    const noonyesterday = new Date(yesterday.setHours(12, 0, 0)).setDate(day - 1)
    console.log(noon)

    const suntimes_yesterday = SunCalc.getTimes(noonyesterday, coord.lat, coord.lon);
    const suntimes_today = SunCalc.getTimes(noon, coord.lat, coord.lon);
    const suntimes_tomorrow = SunCalc.getTimes(noontomorrow, coord.lat, coord.lon);
    console.table([suntimes_yesterday, suntimes_today, suntimes_tomorrow])
    // console.log(convertTime(date, null, false))
    // console.log('suntimes', Object.keys(suntimes_today), Object.values(suntimes_today));
    const suntimes_keys = Object.keys(suntimes_today);
    const newtimes = {};
    for (let key of suntimes_keys) {
        // console.log(suntimes_today[key])
        // console.log(typeof suntimes_today[key]);
        newtimes[key] = convertTime(suntimes_today[key], true);
        
    }
    console.log(date, day)
    console.log('suntimes', suntimes_today);
    console.log('newtimes',newtimes)
    return (
        <div className="time">
            <h4 className='time-h'>Last Updated:</h4>
            <p className='time-d'>{t_display}</p>
            <h4 className='sun-r-h'>Sunrise</h4>
            <p className='sun-r-d'>{sunrise}</p>
            <h4 className='sun-s-h'>Sunset</h4>
            <p className='sun-s-d'>{sunset}</p>
        </div>
    )
}

export default Time
