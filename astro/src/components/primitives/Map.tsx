import { useEffect, useState } from 'react';
import type { EventLocation } from '../../lib/events';
import '../../styles/map.css';

interface MapProps {
  events: EventLocation[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export function Map({ events, center = [20, 0], zoom = 2, className }: MapProps) {
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: any;
    TileLayer: any;
    Marker: any;
    Popup: any;
    useMap: any;
    flagIcon: any;
  } | null>(null);

  useEffect(() => {
    import('leaflet/dist/leaflet.css');
    Promise.all([import('leaflet'), import('react-leaflet')]).then(([L, module]) => {
      const flagIcon = L.icon({
        iconUrl: '/map/map-flag.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      setMapComponents({
        MapContainer: module.MapContainer,
        TileLayer: module.TileLayer,
        Marker: module.Marker,
        Popup: module.Popup,
        useMap: module.useMap,
        flagIcon,
      });
    });
  }, []);

  const validEvents = events.filter(
    (event) => typeof event.lat === 'number' && typeof event.long === 'number'
  );

  if (!MapComponents) {
    return <div style={{ minHeight: '400px', height: '100%', width: '100%', background: 'linear-gradient(135deg, #CCF4FD 0%, #B8D9F8 100%)', borderRadius: '16px' }} className={className} />;
  }

  const { MapContainer, TileLayer, Marker, Popup, useMap, flagIcon } = MapComponents;

  function InvalidateSize() {
    const map = useMap();
    useEffect(() => {
      const timer = setTimeout(() => map.invalidateSize(), 0);
      const resizeTimer = setTimeout(() => map.invalidateSize(), 300);
      return () => {
        clearTimeout(timer);
        clearTimeout(resizeTimer);
      };
    }, [map]);
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className={className}
      style={{ minHeight: '400px', height: '100%', width: '100%' }}
    >
      <InvalidateSize />
      <TileLayer
        attribution='© OpenStreetMap contributors © CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        detectRetina={true}
      />
      {validEvents.map((event) => (
        <Marker key={event.slug} position={[event.lat, event.long]} icon={flagIcon}>
          <Popup className="custom-popup">
            <div>
              <a href={`https://campfire.hackclub.com/${event.slug}`} className="text-black text-lg font-bold font-ember-and-fire">Campfire {event.event_name}</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
