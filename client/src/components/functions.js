// const convertTimezone = (timeInput, tz) => {
//     let correctedtz;
//     const timecheck = new Date();
//     console.log('time0', typeof timecheck)
//     // console.log('hours0', timecheck.getHours())

//     const timecheckapi = new Date(timeInput * 1000);
//     console.log('time1', timecheckapi)
//     // console.log('hours1', timecheckapi.getHours())


//     // console.log(typeof timecheckapi)
//     const timezonecheck = timecheck.getTimezoneOffset() * -60;
//     console.log('timezone0', timezonecheck);
//     console.log('timezone1', tz);



//     if (tz !== timezonecheck) {
//         const apihours = timecheckapi.getHours();
//         timecheckapi.setHours( apihours + ((tz - timezonecheck) / 3600));
//         correctedtz = timecheckapi;

//         // console.log(typeof time)
//     } else {
//         correctedtz = timecheckapi;
//     }

//     console.log(typeof correctedtz)
//     return correctedtz;

// }

export const convertTime = (unixInput, notUnix) => {
    let time;
    // if (needtzcorrect === true) {
    //     time = convertTimezone(unixInput, timezone);
    //     console.log('time3',time)
    // } else {
    //     time = unixInput;
    // }

    if (notUnix !== true) {
        time = new Date(unixInput * 1000);
    } else {
        time = unixInput;
    }
    

    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let session = "am";

    if (hour >= 12){
        hour = hour - 12;
        session = "pm";
    }

    hour = (hour === 0) ? 12 : hour;
    minute = (minute < 10 ) ? "0" + minute : minute;
    second = (second < 10 ) ? "0" + second : second;
    
    let time_display = hour + ":" + minute + ":" + second + " " + session;
    return { t_display: time_display, hour, minute, second, session, date: time, day};
}

export const getDaylight = (daylight) => {
    const { sunrise, sunset } = daylight;
    const sunrise_ret = convertTime(sunrise, false).t_display;
    const sunset_ret = convertTime(sunset, false).t_display;
    return { sunrise: sunrise_ret, sunset: sunset_ret }
}

export const roundTemp = (temp) => {
    return Math.round(temp + Number.EPSILON)
}

export const pressureConv = (pressure_hpa) => {
    const pressure_in = pressure_hpa * 0.03;
    const pressure_round = Math.round((pressure_in + Number.EPSILON) * 100) / 100
    return pressure_round;
}

const degToCompass = (degrees) => {
    const calc = Math.floor((degrees / 22.5) + 0.5);
    const cardinal = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return cardinal[(calc % 16)];
}

export const getWind = (wind) => {
    const { speed, deg } = wind; 
    const direction = degToCompass(deg);
    return {speed, direction}
}