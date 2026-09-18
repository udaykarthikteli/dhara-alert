import React, { useEffect, useState } from 'react';
import { Map, Source, Layer } from '@vis.gl/react-mapbox';

// Mapbox token – placeholder (public token can be used). If no token, the map will still load raster tiles but 3D terrain may be limited.
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';

export default function ThreeDTerrain() {
  const [viewport, setViewport] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 5,
    pitch: 45,
    bearing: 0,
  });

  // Mapbox style URL – using mapbox://styles/mapbox/streets-v11 as base.
  const mapStyle = MAPBOX_TOKEN
    ? `mapbox://styles/mapbox/streets-v11`
    : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  // Terrain source – only works with Mapbox token.
  const terrainSource = MAPBOX_TOKEN
    ? {
        type: 'raster-dem',
        url: `mapbox://mapbox.terrain-rgb`,
        tileSize: 512,
        maxzoom: 14,
      }
    : null;

  return (
    <Map
      {...viewport}
      width='100%'
      height='100vh'
      mapStyle={mapStyle}
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={evt => setViewport(evt.viewState)}
      terrain={terrainSource ? { source: 'terrainSource', exaggeration: 1.5 } : undefined}
    >
      {terrainSource && (
        <Source id='terrainSource' type='raster-dem' tileSize={512} url='mapbox://mapbox.terrain-rgb' />
      )}
    </Map>
  );
}
