import React, { useEffect, useState } from 'react'
import { time, sortTimesObj } from '../utils/time';


const createBar = (sorted_times_array, now) => {
    console.log(sorted_times_array)
    console.log(now)

    const now_hours = now.date_obj.getHours();
    console.log(now_hours)


    const plus_12 = now_hours + 12;
    console.log(plus_12)
    const plus_12_obj = new Date();


    const minus_12 = now_hours - 12
    console.log(minus_12)

    const minus_12_obj = new Date();



    const plus_12_hrs = new Date(plus_12_obj.setHours(plus_12)).getTime();
    const minus_12_hrs = new Date(minus_12_obj.setHours(minus_12)).getTime();


    console.log(minus_12_hrs)
    console.log(now.date_obj.getTime())
    console.log(plus_12_hrs)

    const times_in_range = []

    for (let time_el of sorted_times_array) {
        let compare_val = time_el.v.date_obj.getTime();
        if (compare_val >= minus_12_hrs && compare_val <= plus_12_hrs) {
            times_in_range.push(time_el)
        }
    }

    console.log(times_in_range)
 



    return;
}




const SunBar = ({ sunwindow, tz }) => {

    console.log(sunwindow)

    const current_time = time(new Date(), tz);
    console.log(current_time.date_obj.getTime())

    const sorted_times = sortTimesObj(sunwindow);
    console.log(sorted_times)

    createBar(sorted_times, current_time);


    return (
        <div className='bar-wrapper'>
            <div className='current-time'>
                <p>{current_time.time_display}</p>
            </div>
            <div className='current-time-marker'></div>
            <div className='bar-main'></div>
        </div>
    )
}

export default SunBar
