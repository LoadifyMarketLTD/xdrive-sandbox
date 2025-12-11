import React, { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Route positions: Manchester -> Birmingham -> London
const positions = [
  [53.4808, -2.2426],  // Manchester
  [52.4862, -1.8904],  // Birmingham
  [51.5074, -0.1278]   // London
]

function FitBounds() {
  const map = useMap()
  
  useEffect(() => {
    const bounds = L.latLngBounds(positions)
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map])
  
  return null
}

function MapRoute() {
  return (
    <MapContainer
      center={[52.4862, -1.8904]}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={positions[0]} />
      <Marker position={positions[1]} />
      <Marker position={positions[2]} />
      
      <Polyline
        positions={positions}
        color="blue"
        weight={3}
        opacity={0.7}
      />
      
      <FitBounds />
    </MapContainer>
  )
}

export default MapRoute
