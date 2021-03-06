import React from 'react';
import SunCalc from 'suncalc';
import SunBar from './SunBar'
import { time } from '../utils/time';


const SunSched = ({ props }) => {
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&',props)
    const { coord, timezone, location_time: { date_obj:date, day } } = props;
    // console.log(timezone/3600)
    

    //suncalc
    let yesterday = date;
    let today = date;
    let tomorrow = date;


    const noon = new Date(today.setHours(12, 0, 0));
    const noontomorrow = new Date(tomorrow.setHours(12, 0, 0)).setDate(day + 1);
    const noonyesterday = new Date(yesterday.setHours(12, 0, 0)).setDate(day - 1)
    // console.log(noon)


    //TODO combine this two step (get/convert) into new separate functions
    const suntimes_yesterday = SunCalc.getTimes(noonyesterday, coord.lat, coord.lon);
    const suntimes_today = SunCalc.getTimes(noon, coord.lat, coord.lon);
    const suntimes_tomorrow = SunCalc.getTimes(noontomorrow, coord.lat, coord.lon);
    // console.table([suntimes_yesterday, suntimes_today, suntimes_tomorrow])


    const newtimes_today = {}
    const newtimes_tomorrow = {}
    const newtimes_yesterday = {}

    const suntimes_keys = Object.keys(suntimes_today);
    for (let key of suntimes_keys) {
        newtimes_today[key] = time(suntimes_today[key], timezone);
        newtimes_tomorrow[key] = time(suntimes_tomorrow[key], timezone);
        newtimes_yesterday[key] = time(suntimes_yesterday[key], timezone);


    }
    // console.log(date, day)
    // console.log('suntimes', suntimes_today);
    // console.log('newtimes_td',newtimes_today)
    // console.log('newtimes_tom',newtimes_tomorrow)
    // console.log('newtimes_yes', newtimes_yesterday)
    
    const sunwindow = {
        yesterday: newtimes_yesterday,
        today: newtimes_today,
        tomorrow: newtimes_tomorrow
    }

    return (
        <React.Fragment>
            <SunBar sunwindow={sunwindow} tz={timezone}/>
        </React.Fragment>
    )
}

export default SunSched
