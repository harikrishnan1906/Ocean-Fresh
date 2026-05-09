import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "./LocationPicker.css";
import { useMap } from "react-leaflet";

function LocationPicker({ onLocationSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || null);

  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  //Get current location
  useEffect(() => {
    if (!initialPosition) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const current = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(current);

        //send current location to the location picker
        onLocationSelect(current);
      });
    }
  }, []);

  function ChangeMapView({ position }) {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position);
      }
    }, [position, map]);

    return null;
  }

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);

        onLocationSelect(e.latlng);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  if (!position) {
    return <p>Loading map.....</p>;
  }
  return (
    <>
      <MapContainer center={position} zoom={15} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 🔥 THIS IS IMPORTANT */}
        <ChangeMapView position={position} />

        <LocationMarker />
      </MapContainer>
    </>
  );
}

export default LocationPicker;
