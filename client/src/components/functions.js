export const convertTime = (unixInput, timezone) => {
    const timecheck = new Date();
    const timecheckapi = new Date(unixInput * 1000);
    console.log(typeof timecheckapi)
    const timezonecheck = timecheck.getTimezoneOffset() * -60;
    let time;

    if (timezone !== timezonecheck) {
        console.log(timezone);
        
        const correcttimezone = timecheckapi.setHours( timecheckapi.getHours() + (timezone + Math.abs(timezonecheck) / 3600) + 1);
        console.log(correcttimezone)
        time = new Date(correcttimezone)
        console.log(typeof time)

    } else {
        time = timecheckapi;
    }

    console.log(timezonecheck)
    console.log(timezone)

    console.log(time)
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();
    let session = "am";

    if (hour > 12){
        hour = hour - 12;
        session = "pm";
    }

    hour = (hour === 0) ? 12 : hour;
    minute = (minute < 10 ) ? "0" + minute : minute;
    second = (second < 10 ) ? "0" + second : second;
    
    let time_display = hour + ":" + minute + ":" + second + " " + session;
    return { t_display: time_display, hour, minute, second, session};
}

export const getDaylight = (daylight, timezone) => {
    const { sunrise, sunset } = daylight;
    const sunrise_ret = convertTime(sunrise, timezone).t_display;
    const sunset_ret = convertTime(sunset, timezone).t_display;
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