import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const DefaultIcon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    latitude: number;
    longitude: number;
}

const MapView: React.FC<MapViewProps> = ({ latitude, longitude }) => {
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
        }
    }, [latitude, longitude]);

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={5}
            style={{ height: '400px', width: '100%', padding: '10%' }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    Country coordinates: {latitude}, {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView;
