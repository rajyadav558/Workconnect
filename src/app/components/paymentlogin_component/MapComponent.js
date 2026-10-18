
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// This component detects map clicks
function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onLocationSelect({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return null;
}

function MapUpdater({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (
      Number.isFinite(Number(latitude)) &&
      Number.isFinite(Number(longitude)) &&
      latitude !== null &&
      longitude !== null
    ) {
      map.stop();
      map.setView(
        [Number(latitude), Number(longitude)],
        16,
        { animate: false }
      );
    }
  }, [latitude, longitude, map]);

  return null;
}

export default function MapComponent({
  latitude,
  longitude,
  onLocationSelect,
}) {
  const position = [
    latitude ?? 23.2599,
    longitude ?? 77.4126,
  ];

  

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <MapUpdater latitude={latitude} longitude={longitude} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapClickHandler onLocationSelect={onLocationSelect} />

      <Marker position={position} icon={markerIcon}>
        <Popup>Selected location</Popup>
      </Marker>
    </MapContainer>
  );
}
