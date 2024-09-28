// src/components/MapView.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default icon for markers
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
    const position: [number, number] = [latitude, longitude];

    return (
        <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%',padding:'10%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    Country coordinates: {latitude}, {longitude}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapView

