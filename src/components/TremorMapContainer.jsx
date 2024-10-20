import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import L from "leaflet"; // Ensure you import Leaflet

const TremorMapContainer = ({ formData, updateCoordinates }) => {
  const ClickHandler = ({ setMarkerPosition, updateCoordinates }) => {
    const map = useMap();

    const handleClick = (event) => {
      const { lat, lng } = event.latlng;
      updateCoordinates(lat, lng);
      setMarkerPosition([lat, lng]);
    };

    useEffect(() => {
      map.on("click", handleClick);
      return () => {
        map.off("click", handleClick);
      };
    }, [map, setMarkerPosition, updateCoordinates]);

    return null;
  };

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [markerPosition, setMarkerPosition] = useState([14.599512, 120.984222]);
  const [mapCenter, setMapCenter] = useState([14.599512, 120.984222]);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lon: longitude });
      setMarkerPosition([latitude, longitude]);
      setMapCenter([latitude, longitude]);
    };

    const handleError = (error) => {
      console.error("Error getting location:", error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    let initialPosition = [formData.lat, formData.lon];

    if (isNaN(initialPosition[0]) || isNaN(initialPosition[1])) {
      if (location.lat && location.lon) {
        setMapCenter([location.lat, location.lon]);
      }
    } else {
      setMapCenter(initialPosition);
      setMarkerPosition(initialPosition);
    }
  }, [formData, location, updateCoordinates]);

  // Create a custom marker icon using the Material UI icon
  const customIcon = new L.Icon({
    iconUrl:
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2C8.134 2 5 5.134 5 9c0 3.8 7 11 7 11s7-7.2 7-11c0-3.866-3.134-7-7-7z"/>
          <circle cx="12" cy="9" r="3"/>
        </g>
      </svg>`
      ),
    iconSize: [24, 24], // Size of the icon
    iconAnchor: [12, 24], // Anchor point
  });

  return (
    <>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "45vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler
          setMarkerPosition={setMarkerPosition}
          updateCoordinates={updateCoordinates}
        />

        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}>
            <Popup>
              Latitude: {markerPosition[0]} <br />
              Longitude: {markerPosition[1]}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default TremorMapContainer;
