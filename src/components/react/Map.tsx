'use client'

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RlMjAwMCIsImEiOiJja3IyNmVxamoyOGtjMndvNndhamd3MXF4In0.hk7-ko-5zYmdaM8sI6vO6w';

// Custom CSS for the popup
const popupStyle = `
  .mapboxgl-popup-content {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.125);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    font-size: 1rem;
    display: flex;
    gap: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .mapboxgl-popup-tip {
    display: none;
  }
  .mapboxgl-popup-close-button {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    line-height: 0;
    position: relative;
  }
  .mapboxgl-popup-close-button:hover, .mapboxgl-popup-close-button:focus {
    color: white;
    background: none;
    border: none;
    outline: none;
  }
`;

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
  className = 'size-full rounded-lg',
  marker
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Add custom popup styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = popupStyle;
    document.head.appendChild(styleSheet);

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
            const popup = new mapboxgl.Popup({
              offset: 40,
              closeButton: true,
              closeOnClick: false,
              maxWidth: '300px'
            }).setHTML(`
              <div class="font-medium">
                ${marker.popupContent}
              </div>
            `);
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
        // Remove custom styles
        document.head.removeChild(styleSheet);
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