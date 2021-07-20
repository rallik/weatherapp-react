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