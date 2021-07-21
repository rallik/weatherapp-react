import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';


const WeatherAppContext = React.createContext();

const WeatherAppProvider = ({ children }) => {
    //initialize state for a loading property, the location input for the api
    const [location, setLocation] = useState('');
    const [currentWeather, setCurrentWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(true);
    const initialRender = useRef(true);
    const validLocation = useRef(null);

    // const KEY = process.env.REACT_APP_API_KEY;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${KEY}&units=imperial`;
    // console.count('initialize states')

    const postLoc = async (updated_loc) => {
        const resp = await fetch('http://localhost:5501/search-loc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({ loc: updated_loc })
        })
        const recieved = await resp.json();
        console.log(recieved)

    };
    
    
    const fetchWeather = useCallback(async () => {
        // console.count('fetchWeather')
        try {
            // console.count('try clause')
            // const response = await fetch(url);
            postLoc(location)
            const response = await fetch('http://localhost:5501/weather');
            const data = await response.json();
            if (data && data.cod !== "404") {
                // console.count('valid return')
                validLocation.current = true;
                setCurrentWeather(data)
                setLoading(false);
            } else {
                // console.count('invalid return')
                validLocation.current = false;
                setLoading(false);
            }
        } catch (error) {
            // console.error('error', error)
            validLocation.current = false;
            setLoading(false);
        }
        
    }, [location])

    useEffect(() => {
        if (initialRender.current) {
            // console.count('initial render useEffect');
            initialRender.current = false;
        } else {
            // console.count('other render useEffect')
            fetchWeather()
        }
    },
        [fetchWeather])

    return (
        <WeatherAppContext.Provider
            value={{initialRender, loading, setLoading, modalOpen, setModalOpen, validLocation, currentWeather, location, setLocation}}
        >
            {children}
        </WeatherAppContext.Provider>
    );
}

export const useGlobalContext = () => {
    // console.count('context - GLOBAL')
    return useContext(WeatherAppContext);
}

export { WeatherAppContext, WeatherAppProvider };