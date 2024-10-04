import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

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

    useEffect(() => {
      map.setView(mapCenter);
    }, [map, mapCenter]);
    return null;
  };

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

  let initialPosition = [formData.lat, formData.lon];

  const [location, setLocation] = useState({ lat: null, lon: null });
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  useEffect(() => {
    if (isNaN(formData.lat) || isNaN(formData.lon)) {
      if (location.lat && location.lon) {
        setMapCenter([location.lat, location.lon]);
      }
    } else {
      setMapCenter([formData.lat, formData.lon]);
      setMarkerPosition([formData.lat, formData.lon]);
    }
  }, [formData, location, updateCoordinates]);
  return (
    <>
      <MapContainer
        center={
          isNaN(initialPosition[1], isNaN(initialPosition[0]))
            ? mapCenter
            : initialPosition
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
    </>
  );
};

export default TremorMapContainer;
