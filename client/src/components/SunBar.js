import React, { useEffect, useState } from 'react'
import { time, sortTimesObj, filterVisiblePositions, getPercentsFromTimes } from '../utils/time';






const SunBar = ({ sunwindow, tz }) => {

    console.log(sunwindow)

    const current_time = time(new Date(), tz);
    // console.log(current_time.date_obj.getTime())

    const sorted_times = sortTimesObj(sunwindow);
    // console.log(sorted_times)

    const filtered_times = filterVisiblePositions(sorted_times, current_time);

    const percents_from_times = getPercentsFromTimes(filtered_times);


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
