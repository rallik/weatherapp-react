import React, { useState, useEffect, useContext, useCallback } from 'react';


const WeatherAppContext = React.createContext();

const WeatherAppProvider = ({ children }) => {
    //initialize state for a loading property, the location input for the api
    const [location, setLocation] = useState('boston');
    const [currentWeather, setCurrentWeather] = useState({})

    const KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`;

    
    
    const fetchWeather = useCallback(async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.cod !== "404") {
                setCurrentWeather(data)
            }
        } catch (error) {
            console.error('error', error)
        }
        
    }, [location, url])

    useEffect(() => fetchWeather(), [fetchWeather, location])

    return (
        <WeatherAppContext.Provider
            value={{currentWeather, location, setLocation}}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(WeatherAppContext);
}

export { WeatherAppContext, WeatherAppProvider };