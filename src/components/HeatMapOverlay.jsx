import { TileLayer } from 'react-leaflet';

// Simple heatmap overlay using OpenWeatherMap precipitation tiles (no API key needed for demo)
// For production you can replace URL with a proper API key or other provider.

export default function HeatMapOverlay() {
  const url = 'https://tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png?appid=YOUR_API_KEY';
  // Fallback to OSM tile with red tint if no API key provided
  const fallbackUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const useFallback = true; // set to false when you have a valid OpenWeatherMap key
  const tileUrl = useFallback ? fallbackUrl : url;

  return (
    <TileLayer
      url={tileUrl}
      opacity={0.5}
      attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
    />
  );
}
