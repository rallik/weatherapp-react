import React, { useState, useEffect, useContext, useCallback } from 'react';


const WeatherAppContext = React.createContext();

const WeatherAppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('boston,usa');
    const [currentWeather, setCurrentWeather] = useState({})

    const KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`;

    
    
    const fetchWeather = useCallback(async () => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data) {
                // const { clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind } = data;
                // console.log(clouds, coord, dt, main, name, sys, timezone, visibility, weather, wind)
                setCurrentWeather(data)
            }
        } catch (error) {
            console.error('error', error)
            setLoading(false)
        }
        
    }, [location])

    useEffect(() => fetchWeather(), [fetchWeather, location])

    return (
        <WeatherAppContext.Provider
            value={{loading, currentWeather, location, setLocation}}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(WeatherAppContext);
}

export { WeatherAppContext, WeatherAppProvider };