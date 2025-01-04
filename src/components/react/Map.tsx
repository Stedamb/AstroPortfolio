'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlMjAwMCIsImEiOiJja3IyNmVxamoyOGtjMndvNndhamd3MXF4In0.hk7-ko-5zYmdaM8sI6vO6w';

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  marker?: {
    coordinates: [number, number];
    popupContent?: string;
  };
}

export default function Map({
  center = [-74.5, 40],
  zoom = 9,
  className = 'size-full rounded-3xl',
  marker
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {


    if (!mapContainer.current || map.current) return;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: center,
        zoom: zoom,
        attributionControl: false
      });

      // Add error handling for map load
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Failed to load map');
      });

      // Ensure map is fully loaded
      map.current?.on('load', () => {
        if (marker && marker.coordinates) {
          const markerInstance = new mapboxgl.Marker({
            color: '#9c27b0', // Tailwind purple-500
          })
            .setLngLat(marker.coordinates)
            .addTo(map.current!);

          if (marker?.popupContent) {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(marker.popupContent);
            markerInstance.setPopup(popup);
          }
        }
      });

      // Cleanup on unmount
      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map');
    }
  }, [center, zoom, marker]);

  if (mapError) {
    return (
      <div className="flex items-center justify-center size-full bg-red-100 text-red-600 p-4">
        <p>Error loading map: {mapError}</p>
      </div>
    );
  }

  return <div ref={mapContainer} className={className} />;
}