import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import { MapContainer, TileLayer, WMSTileLayer, useMap, ZoomControl, LayersControl, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Display = () => {
    const { currentWeather: { coord } } = useGlobalContext();
    const [center, setCenter] = useState([42.3601, -71.0589]);
    const [marker, setMarker] = useState(false);
    let zoom = 10;
    let key = Math.random();

    //API KEY
    const M_KEY = process.env.REACT_APP_M_KEY;

    //Open Street Maps
    const osm_attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    const osm_source = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Rain viewer
    // const rv_attribution = 'aaa';

    //Iowa State
    const is_attribution = 'Weather data © IEM Nexrad';
    const is_source = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi'
    const is_layers = 'nexrad-n0r-900913';
    const is_format = 'image/png';
    
    //Maptiler 
    const m_attr = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors &vert; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'; 
    const m_url = `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=${M_KEY}`
    
    
    //Testing useMap
    const ChangeView = ({ center, zoom }) => {
        const map = useMap();
        // console.log('map', map.getCenter())
        map.setView(center, zoom);
        // console.log('************ changeView');
        return null;
    }


    //Add icon
    const newIcon = () => {
        let new_icon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconAnchor: [16, 37],
        });
        return new_icon;
    }

    useEffect(() => {
        if (coord) {
            const coordcenter = [coord.lat, coord.lon];
            setCenter(coordcenter)
            setMarker(true);
            // console.log('************ map useEffect');
        }
    }, [coord])
    
    return (
        <section className='map-display'>
            {/* Equivilant to L.map('map', {center: position, zoom: zoom}); */}
            <MapContainer className='map' key={key} center={center} zoom={zoom} scrollWheelZoom={true} zoomControl={false}>
                <LayersControl position='bottomright'>
                    <LayersControl.BaseLayer checked name="Open Street Maps">
                        <TileLayer attribution={osm_attribution} url={osm_source}/>
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Maptiler Satellite">
                        <TileLayer attribution={m_attr} url={m_url}/>
                    </LayersControl.BaseLayer>

                    <LayersControl.Overlay name='Pricipitation' checked={true}>
                        <WMSTileLayer attribution={is_attribution} url={is_source} opacity={0.4} params={{layers: is_layers, format:is_format, transparent:true}} whenCreated={console.log('map created')}/>
                    </LayersControl.Overlay>

                    <ChangeView center={center} zoom={zoom}/>
                </LayersControl>
                <ZoomControl position="bottomright" />
                {marker && <Marker position={center} icon={newIcon()}/>}
            </MapContainer>
        </section>
    );
}

export default Display
