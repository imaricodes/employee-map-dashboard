"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useDashboardContext } from "@/contexts/DashboardContext";

const containerStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "100%", // Set height to 100% for responsiveness
  // width: '400px', // Set width to 100% for responsiveness
  // height: '400px', // Set height to 100% for responsiveness
};

const center = {
  lat: -3.745,
  lng: -38.523,
};



function MyComponent() {
  const { employees } = useDashboardContext();
  console.log("employees in google map module", employees);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);

    employees.forEach((location) => {
      bounds.extend({ lat: location.location.lat, lng: location.location.lng });
    });

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        {employees.map((marker, index) => (
          //marker.location is an object that has lat and lng as properties
          <Marker key={index} position={marker.location} />
        ))}
      </>
    </GoogleMap>
  ) : (
    <>
      <p>Loading...</p>
    </>
  );
}

export default React.memo(MyComponent);
