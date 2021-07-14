import React from 'react'
import { time } from '../utils/time';


const SunBar = ({ sunwindow, tz }) => {

    console.log(sunwindow)

    const current_time = time(new Date(), tz);
    console.log(current_time)

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])



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
