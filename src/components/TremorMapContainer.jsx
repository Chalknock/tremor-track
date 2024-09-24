import SearchControl from "leaflet-geosearch/lib/SearchControl.js";
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

  const handleGetCurrentLocation = () => {
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
  };
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
    <MapContainer
      center={
        isNaN(initialPosition[1], isNaN(initialPosition[0]))
          ? mapCenter
          : initialPosition
      }
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: "50vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickHandler
        setMarkerPosition={setMarkerPosition}
        updateCoordinates={updateCoordinates}
      />
      {/* <SearchControl
        provider="OpenStreetMap"
        style={{ position: "absolute", top: "10px", left: "10px" }}
        showMarker={true}
        zoom={15}
        openSearchOnLoad={true}
        onResultSelected={(result) => {
          const { lat, lng } = result;
          setMapCenter([lat, lng]);
          setMarkerPosition([lat, lng]);
          map.setView([lat, lng], 15);
        }}
      /> */}
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>
            Marker dropped at: <br />
            Latitude: {markerPosition[0]}, Longitude: {markerPosition[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default TremorMapContainer;
