"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useDashboardContext } from "@/contexts/DashboardContext";

const containerStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "100%", // Set height to 100% for responsiveness
  // width: '400px', // Set width to 100% for responsiveness
  // height: '400px', // Set height to 100% for responsiveness
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

const center = {
  lat: 47.608013,
  lng: -122.335167,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

function MyComponent() {
  // const { employees } = useDashboardContext();
  // console.log("employees in google map module", employees);
  // console.log("employees in google map module", employees);
  const [map, setMap] = useState(null);
  const [employees, setEmployees] = useState([]);
  const mapRef = useRef(null);


  useEffect(() => {
    const getEmployees = async () => {
      const response = await fetch("/api/getEmployees");
      const data = await response.json();
      data.data.map((employee) => {
        // console.log(employee.email)
      });
      setEmployees(data.data);
      // return data.data;
    };
    getEmployees();
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });




  const onLoad = useCallback(function callback(map) {
    console.log("employees in bounds before: ", employees);
    mapRef.current = map;

    const bounds = new window.google.maps.LatLngBounds(center);

    if (employees.length === 0) {
      employees.forEach((employee) => {
        console.log("employee lat", employee.geo);
        console.log("employee lat", employee.geo.lat);
        console.log("employee lng", employee.geo.lat);
        bounds.extend({ lat: employee.geo.lat, lng: employee.geo.lng });
        map.fitBounds(bounds);
      });

      // Adjust zoom level after fitting bounds (**This is where zoom is updated in Option 1**)

    }
    setMap(map);
  }, [employees]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (mapRef.current && employees.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      employees.forEach((employee) => {
        bounds.extend({ lat: employee.geo.lat, lng: employee.geo.lng });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [employees]);



  if (isLoaded) {
    if (employees.length > 0) {
      return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13} // Increased zoom level for Seattle
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            {employees.map((employee, index) => (
              <Marker key={index} position={employee.geo} />
            ))}
          </>
        </GoogleMap>
      );
    } else {
      return <p>Loading employees...</p>;
    }
  } else {
    return <p>Loading Map...</p>;
  }
}

export default React.memo(MyComponent);
