import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

// IMPORTANT: Make sure to import 'leaflet/dist/leaflet.css' in your main entry file (e.g., index.tsx or App.tsx)
// import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue in leaflet
const markerIcon2x = require("leaflet/dist/images/marker-icon-2x.png");
const markerIcon = require("leaflet/dist/images/marker-icon.png");
const markerShadow = require("leaflet/dist/images/marker-shadow.png");

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface LatLng {
  lat: number;
  lng: number;
}

type LatLngTuple = [number, number];

interface MapRouteMockProps {
  origin?: LatLng;
  destination?: LatLng;
  route?: LatLng[];
  height?: number | string;
}

// Default: Kathmandu, Nepal
const DEFAULT_ORIGIN = { lat: 27.6878, lng: 85.3177 };
const DEFAULT_DEST = { lat: 27.7136, lng: 85.3157 };

function toTuple({ lat, lng }: LatLng): LatLngTuple {
  return [lat, lng];
}

export const MapRouteMock: React.FC<MapRouteMockProps> = ({
  origin = DEFAULT_ORIGIN,
  destination = DEFAULT_DEST,
  route,
  height = 180,
}) => {
  const routeLine = (route || [origin, destination]).map(toTuple);
  const center: LatLngTuple = [
    (origin.lat + destination.lat) / 2,
    (origin.lng + destination.lng) / 2,
  ];

  // Helper to fit bounds
  function FitBounds() {
    const map = useMap();
    React.useEffect(() => {
      map.fitBounds([toTuple(origin), toTuple(destination)], { padding: [30, 30] });
    }, [map, origin, destination]);
    return null;
  }

  return (
    <div style={{ width: "100%", height, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
        attributionControl={false}
        keyboard={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={toTuple(origin)} />
        <Marker position={toTuple(destination)} />
        <Polyline positions={routeLine} pathOptions={{ color: "#c1f11d", weight: 5 }} />
        <FitBounds />
      </MapContainer>
    </div>
  );
}; 