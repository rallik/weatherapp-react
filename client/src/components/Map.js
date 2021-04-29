import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import L, { Layer } from 'leaflet';
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Display = () => {
    const { currentWeather: { coord } } = useGlobalContext();
    const [center, setCenter] = useState([42.3601, -71.0589]);
    const [key, setKey] = useState(Math.random())

    //API KEY
    const OWM_KEY = process.env.REACT_APP_OWM_KEY;
    const M_KEY = process.env.REACT_APP_M_KEY;

    //Open Street Maps
    const osm_attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const osm_source = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Rain viewer
    const rv_attribution = 'aaa';

    //Iowa State
    const is_attribution = 'Weather data © 2012 IEM Nexrad';
    const is_source = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi'
    
    //Maptiler 
    const m_attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &vert; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'; 
    const m_url = `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${M_KEY}`

    //OWM Layer values
    const layers = {
        clouds: 'clouds_new',
        precip: 'precipitation_new',
        pressure: 'pressure_new',
        wind: 'wind_new',
        temp: 'temp_new'
    };
    
    //Testing useMap
    const DisplayMap = () => {
        const map = useMap();
        console.log('map', map.getCenter())
        return null;
    }

    useEffect(() => {
        if (coord) {
            const coordcenter = [coord.lat, coord.lon];
            setCenter(coordcenter)
        }
    }, [coord])
    
    return (
        <section className='weather-map'>
            {/* Equivilant to L.map('map', {center: position, zoom: zoom}); */}
            <MapContainer className='map' key={key} center={center} zoom={10} scrollWheelZoom={true}>
                <LayersControl position='topright'>
                    <LayersControl.BaseLayer checked name="Open Street Maps">
                        <TileLayer attribution={osm_attribution} url={osm_source}/>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Maptiler Satellite">
                        <TileLayer attribution={m_attr} url={m_url}/>
                    </LayersControl.BaseLayer>
                    <DisplayMap/>
                </LayersControl>
            </MapContainer>
        </section>
    );
}

export default Display
