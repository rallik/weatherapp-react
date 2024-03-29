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
    const server_url = process.env.REACT_APP_SERVER_URL;
    
    
    const fetchWeather = useCallback(async () => {
        try {
            const resp = await fetch(`${server_url}/weather`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ loc: location })
            })
            const data = await resp.json();
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
        
    }, [location, server_url])

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