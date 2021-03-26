const convertTime = (unixInput) => {
    let time = new Date(unixInput * 1000);
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
    return { diplay: time_display, hour, minute, second, session};
}

export const getDaylight = (daylight) => {
    const { sunrise, sunset } = daylight;
    let sunrise_ret = convertTime(sunrise);
    let sunset_ret = convertTime(sunset);
    return { sunrise: sunrise_ret, sunset: sunset_ret }
}

export const pressureConv = (pressure_hpa) => {
    let pressure_in = pressure_hpa * 0.03;
    let pressure_round = Math.round((pressure_in + Number.EPSILON) * 100) / 100
    return pressure_round;
}

const degToCompass = (degrees) => {
    let calc = Math.floor((degrees / 22.5) + 0.5);
    let cardinal = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return cardinal[(calc % 16)];
}

export const getWind = (wind) => {
    const { speed, deg } = wind; 
    let direction = degToCompass(deg);
    return {speed, direction}
}