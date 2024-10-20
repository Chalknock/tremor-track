import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import PersonPinIcon from "@mui/icons-material/PersonPin";

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

const TremorMapContainer = ({ formData, updateCoordinates }) => {
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
        isNaN(formData.lat) || isNaN(formData.lon)
          ? mapCenter
          : [formData.lat, formData.lon]
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <PersonPinIcon style={{ marginRight: "8px" }} />
              <div>
                Latitude: {markerPosition[0]} <br />
                Longitude: {markerPosition[1]}
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TremorMapContainer;
