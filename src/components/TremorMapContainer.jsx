import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Set default icon options for markers
delete L.Icon.Default.prototype._getIconUrl; // Remove default icon URL method
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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
    if (!isNaN(formData.lat) && !isNaN(formData.lon)) {
      setMapCenter([formData.lat, formData.lon]);
      setMarkerPosition([formData.lat, formData.lon]);
    } else if (location.lat && location.lon) {
      setMapCenter([location.lat, location.lon]);
    }
  }, [formData, location]);

  return (
    <MapContainer
      center={
        isNaN(markerPosition[0]) || isNaN(markerPosition[1])
          ? mapCenter
          : markerPosition
      }
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
        <Marker position={markerPosition}>
          <Popup>
            Latitude: {markerPosition[0]} <br />
            Longitude: {markerPosition[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TremorMapContainer;
