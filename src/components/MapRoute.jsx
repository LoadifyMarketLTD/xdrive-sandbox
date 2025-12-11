import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// Route positions: Manchester -> Birmingham -> London
const positions = [
  [53.4808, -2.2426], // Manchester
  [52.4862, -1.8904], // Birmingham
  [51.5074, -0.1278], // London
];

function FitBounds() {
  const map = useMap();
  
  useEffect(() => {
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);

  return null;
}

function MapRoute() {
  return (
    <div className="map-container">
      <MapContainer
        center={[52.4862, -1.8904]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Markers for each position */}
        <Marker position={positions[0]} />
        <Marker position={positions[1]} />
        <Marker position={positions[2]} />
        
        {/* Polyline connecting the route */}
        <Polyline
          positions={positions}
          color="blue"
          weight={3}
          opacity={0.7}
        />
        
        <FitBounds />
      </MapContainer>
    </div>
  );
}

export default MapRoute;
