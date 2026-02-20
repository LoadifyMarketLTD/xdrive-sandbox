import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
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
  const manchesterCoords = [53.4808, -2.2426]
  const birminghamCoords = [52.4862, -1.8904]
  const londonCoords = [51.5074, -0.1278]
  const routeCoordinates = [manchesterCoords, birminghamCoords, londonCoords]
  const blueLineOptions = { color: '#3B82F6', weight: 4 }

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={birminghamCoords}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={manchesterCoords} />
        <Marker position={birminghamCoords} />
        <Marker position={londonCoords} />
        <Polyline positions={routeCoordinates} pathOptions={blueLineOptions} />
        <FitBounds positions={routeCoordinates} />
      </MapContainer>
    </div>
  )
}
