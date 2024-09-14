import React from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class MapSearch extends MapControl {
  createLeafletElement() {
    return GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: "search",
    });
  }
}

export default MapSearch;
