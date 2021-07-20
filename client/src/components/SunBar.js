import React, { useEffect, useState } from 'react'
import { time, sortTimesObj, filterVisiblePositions, getPercentsFromTimes, getPrevNextCss } from '../utils/time';


const BarSegment = ({ bar_data }) => {
    let percent_to_string = bar_data.p_delta + '%';
    let event_name_for_css;
    
    if (bar_data.t === 'solarNoon') {
        event_name_for_css = 'noon day'
    } else {
        event_name_for_css = bar_data.t_css;
    }


    if (bar_data.last) {
        const {for_css: last_segment_css} = getPrevNextCss(bar_data.t_next);
        let last_segment_width = (100 - bar_data.p) + '%';

        return (
            <React.Fragment>
                <div
                    className={event_name_for_css + ' bar-section'} 
                    style={{ width: percent_to_string }}
                ></div>
                <div
                    className={last_segment_css + ' bar-section'} 
                    style={{ width: last_segment_width }}
                ></div>
            </React.Fragment>
        );
    } else {
        return (
            <div
                className={event_name_for_css + ' bar-section'} 
                style={{ width: percent_to_string }}
            ></div>
        );
    }

    
}

const MapToBar = ({ times_w_percents_input }) => {
    console.log(times_w_percents_input)

    return (
        <React.Fragment>
            {
                times_w_percents_input.map((bar) => {
                    // let percent_to_string = bar.p_delta + '%';

                    // if (bar.first === true) {
                    //     return (
                    //         <div 
                    //             key={bar.t + bar.d} 
                    //             className={bar.t + ' bar-section'} 
                    //             style={{ width: percent_to_string }}
                    //         ></div>
                    //     );
                    // }
                    // else if (bar.last === true) {
                    //     //changes to difference between current percent and 100
                    //     let end_percent_to_string = (100 - bar.p) + '%';
                    //     // percent_to_string = end_percent + '%'

                    //     return (
                    //         <div
                    //             key={bar.t + bar.d}
                    //             className={bar.t + ' bar-section'}
                    //             style={{ width: end_percent_to_string }}
                    //         ></div>
                    //     );
                    // }
                    // else {
                    //     return (
                    //         <div
                    //             key={bar.t + bar.d}
                    //             className={bar.t + ' bar-section'}
                    //             style={{ width: percent_to_string }}
                    //         ></div>
                    //     );
                    // }

                    return (
                        <BarSegment key={bar.t + bar.d} bar_data={bar} />
                    );
                })
            }
        </React.Fragment>
    );
}



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
            <div className='bar-main'>
                <MapToBar times_w_percents_input={percents_from_times}/>
            </div>
        </div>
    )
}

export default SunBar
