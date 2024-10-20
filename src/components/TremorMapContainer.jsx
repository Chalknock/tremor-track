import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import PersonPinIcon from "@mui/icons-material/PersonPin"; // Import the MUI icon
import L from "leaflet"; // Import Leaflet
import { SvgIcon } from "@mui/material"; // Import SvgIcon for styling

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
  const [markerPosition, setMarkerPosition] = useState([14.599512, 120.984222]);
  const [mapCenter, setMapCenter] = useState([14.599512, 120.984222]);

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

  // Create a custom Leaflet icon using the Material-UI icon
  const personPinIcon = new L.divIcon({
    className: "custom-icon", // Add a custom class for styling
    iconSize: [24, 24], // Size of the icon
    iconAnchor: [12, 24], // Anchor point of the icon
    html:
      '<div style="position: relative; width: 24px; height: 24px;">' +
      '<svg style="width: 100%; height: 100%;">' +
      '<g fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<path d="M12 2c-5.52 0-10 4.48-10 10s10 16 10 16 10-10.49 10-16-4.48-10-10-10zm0 14.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />' +
      "</g></svg>" +
      "</div>",
  });

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
          <Marker position={markerPosition} icon={personPinIcon}>
            {" "}
            {/* Use the custom icon */}
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
    </>
  );
};

export default TremorMapContainer;
