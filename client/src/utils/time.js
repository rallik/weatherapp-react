/*
-Checks if time/date input is a js Date object, converts if necessary
----SunCalc returns a NaN ('invalid date') Date obj if sun does not reach a certain angle
----but this will still be returned

Params:
- Time input (Date obj or unix)

Returns:
- Date obj
*/
const dateObjCheck = (time_input) => {
    switch (time_input instanceof Date) {
        case true:
            return time_input;
        
        case false:
            return new Date(time_input * 1000);
        
        default:
            console.log('check for different input type')
    }
}



const getDateObjParts = (date_obj_input) => {
    if (isNaN(date_obj_input)) {
        return 'Sun Not Here'
    } else {

        let time = {
            day: date_obj_input.getDate(),
            hr24: date_obj_input.getHours(),
            min: date_obj_input.getMinutes(),
            sec: date_obj_input.getSeconds(),
            date_obj: date_obj_input
        }
        
        // console.log(time)
        return time;
    }
}

const convertTimezone = (time_obj_input, location_tz) => {
    const time_obj_return = time_obj_input;
    //expected to be in minutes
    const user_tz_hrs = time_obj_return.date_obj.getTimezoneOffset() / -60;

    //expected to be in seconds
    const location_tz_hrs = location_tz / 3600;


    if (user_tz_hrs === location_tz_hrs) {
        // console.log(time_obj_return)
        return time_obj_return;
    } else {
        const time_diff = location_tz_hrs - user_tz_hrs;
        const hr_shift = time_obj_return.hr24 + time_diff;
        // console.log(hr_shift)

        let hr_shift_corrected;
        
        
        if (hr_shift > 24) {
            hr_shift_corrected = hr_shift - 24;
            time_obj_return.hr24 = hr_shift_corrected;
        } else if (hr_shift < 0) {
            hr_shift_corrected = hr_shift + 24;
            time_obj_return.hr24 = hr_shift_corrected;
        } else {
            // console.log('no shift past 0 or 24')
            time_obj_return.hr24 = hr_shift;
        }
        
        // console.log(time_obj_return)
        return time_obj_return;

    }
}

const formatTime = (time_obj_input) => {
    let hour12 = time_obj_input.hr24;
    let minute_display = time_obj_input.min;
    let session = 'am';

    if (hour12 >= 12) {
        hour12 = hour12 - 12;
        session = 'pm';
    }

    hour12 = (hour12 === 0) ? 12 : hour12;
    minute_display = (minute_display < 10 ) ? "0" + minute_display : minute_display;
    
    let time_display = hour12 + ":" + minute_display + " " + session;


    const time_obj_return = {
        ...time_obj_input,
        hour12,
        session,
        time_display
    }

    // console.log(time_obj_return)
    return time_obj_return;
}


export const time = (raw_input, location_tz) => {
    const date_obj = dateObjCheck(raw_input);
    
    const time_obj = getDateObjParts(date_obj);

    if (time_obj === 'Sun Not Here') {
        return 'Sun Not Here';
    } else {
        const time_obj_converted_tz = convertTimezone(time_obj, location_tz);

        const time_obj_final = formatTime(time_obj_converted_tz);

        // console.log(time_obj_final)

        return time_obj_final;
    }

}


export const getCurrentTime = () => {
    const now = new Date();
    const now_time_obj = getDateObjParts(now);
    const now_time_obj_final = formatTime(now_time_obj)
    return now_time_obj_final;
}


export const sortTimesObj = (suntimes_obj) => {

    // console.log(Object.keys(suntimes_obj.today))

    let keys = [
        'yesterday',
        'today',
        'tomorrow'
    ];

    let data_order = [
        'sunrise',
        'sunriseEnd',
        'goldenHourEnd',
        'solarNoon',
        'goldenHour',
        'sunsetStart',
        'sunset',
        'dusk',
        'dawn'
    ];

    // console.log(keys)
    // console.log(data_order)

    const suntimes_array = []

    for (let key of keys) {
        for (let order of data_order)
            suntimes_array.push({t: order + '_' + key, v: suntimes_obj[key][order]})
    }

    // console.log(suntimes_array)
    return suntimes_array;
}


export const filterVisiblePositions = (sorted_times_array, now) => {
    console.log(sorted_times_array)
    console.log(now)

    const now_hours = now.date_obj.getHours();
    // console.log(now_hours)


    const plus_12 = now_hours + 12;
    // console.log(plus_12)
    const plus_12_obj = new Date();


    const minus_12 = now_hours - 12
    // console.log(minus_12)

    const minus_12_obj = new Date();



    const plus_12_hrs = new Date(plus_12_obj.setHours(plus_12)).getTime();
    const minus_12_hrs = new Date(minus_12_obj.setHours(minus_12)).getTime();
    const now_hrs = now.date_obj.getTime();

    // console.log(minus_12_hrs)
    // console.log(now.date_obj.getTime())
    // console.log(plus_12_hrs)

    const times_in_range = []

    for (let time_el of sorted_times_array) {
        let compare_val = time_el.v.date_obj.getTime();
        if (compare_val >= minus_12_hrs && compare_val <= plus_12_hrs) {
            times_in_range.push(time_el)
        }
    }


    const range = {
        minus_12_hrs,
        now_hrs,
        plus_12_hrs
    }

    // console.log(times_in_range)
    return { times_in_range, range };
}



export const getPercentsFromTimes = (filtered_times_input) => {
    console.log(filtered_times_input)

    const { range, times_in_range } = filtered_times_input;

    let time_denomenator = range.plus_12_hrs - range.minus_12_hrs;
    let time_x0 = range.minus_12_hrs;
    let time_x1;

    let percent;

    for (let times of times_in_range) {
        
        time_x1 = times.v.date_obj.getTime();

        percent = (time_x1 - time_x0) / time_denomenator*100;

        console.log(percent)
        





    }


    return;
}