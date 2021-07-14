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