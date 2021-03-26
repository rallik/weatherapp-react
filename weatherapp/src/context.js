import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';


const WeatherAppContext = React.createContext();

const WeatherAppProvider = ({ children }) => {
    //initialize state for a loading property, the location input for the api
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(false)
    const initialRender = useRef(true);
    const validLocation = useRef(null);

    const KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}`;

    
    
    const fetchWeather = useCallback(async () => {
        console.count('fetchWeather')
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.cod !== "404") {
                validLocation.current = true;
                setCurrentWeather(data)
                setLoading(false);
            } else {
                validLocation.current = false;
                setLoading(false);
            }
        } catch (error) {
            console.error('error', error)
            validLocation.current = false;
            setLoading(false);
        }
        
    }, [url])

    useEffect(() => {
        if (initialRender.current) {
            console.count('initial render useEffect')
            initialRender.current = false;
        } else {
            console.count('other render useEffect')
            fetchWeather()
        }
    },
        [fetchWeather, location])

    return (
        <WeatherAppContext.Provider
            value={{initialRender, loading, validLocation, currentWeather, location, setLocation}}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(WeatherAppContext);
}

export { WeatherAppContext, WeatherAppProvider };