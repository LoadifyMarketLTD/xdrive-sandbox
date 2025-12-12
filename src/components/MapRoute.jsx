import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

// Component to fit bounds after map renders
function FitBounds({ positions }) {
  const map = useMap()
  
  useEffect(() => {
    if (positions && positions.length > 0) {
      const bounds = L.latLngBounds(positions)
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [map, positions])
  
  return null
}

export default function MapRoute() {
  // Manchester (collection point)
  const manchesterCoords = [53.4808, -2.2426]
  
  // Birmingham (waypoint)
  const birminghamCoords = [52.4862, -1.8904]
  
  // London (delivery point)
  const londonCoords = [51.5074, -0.1278]
  
  // Route coordinates for the polyline: Manchester → Birmingham → London
  const routeCoordinates = [manchesterCoords, birminghamCoords, londonCoords]
  // London (delivery point)
  const londonCoords = [51.5074, -0.1278]
  
  // Route coordinates for the polyline
  const routeCoordinates = [manchesterCoords, londonCoords]
  
  // Blue color for the route line
  const blueLineOptions = { color: '#3B82F6', weight: 4 }

  return (
    <div className="map-container">
      <MapContainer
        center={birminghamCoords}
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[52.4862, -1.1904]} // Center between Manchester and London
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Collection point marker (Manchester) */}
        <Marker position={manchesterCoords} title="Collection: Manchester" />
        
        {/* Waypoint marker (Birmingham) */}
        <Marker position={birminghamCoords} title="Waypoint: Birmingham" />
        
        {/* Delivery point marker (London) */}
        <Marker position={londonCoords} title="Delivery: London" />
        
        {/* Route polyline connecting the three points */}
        <Polyline positions={routeCoordinates} pathOptions={blueLineOptions} />
        
        {/* Fit bounds to show all markers */}
        {/* Delivery point marker (London) */}
        <Marker position={londonCoords} title="Delivery: London" />
        
        {/* Route polyline connecting the two points */}
        <Polyline positions={routeCoordinates} pathOptions={blueLineOptions} />
        
        {/* Fit bounds to show both markers */}
        <FitBounds positions={routeCoordinates} />
      </MapContainer>
    </div>
  )
}
