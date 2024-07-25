"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useDashboardContext } from "@/contexts/DashboardContext";
import {
  filterEmployeesWithValidGeo,
  calculateCenter,
} from "@/app/lib/googleMapUtilities";

const containerStyle = {
  width: "100%", // Set width to 100% for responsiveness
  height: "100%", // Set height to 100% for responsiveness
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};

function MyComponent() {
  const { employees, employeesLoading } = useDashboardContext();
  const [validEmployees, setValidEmployees] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const mapRef = useRef(null);
  const centerRef = useRef(null);

  console.log("employees in map: ", employees);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map) {
      mapRef.current = map;

      const bounds = new window.google.maps.LatLngBounds(centerRef.current);
      console.log("employees legth: ", employees.length);

      if (employees.length > 0) {
        const validEmployees = filterEmployeesWithValidGeo(employees);
        validEmployees.forEach((employee) => {
          bounds.extend({ lat: employee.geo.lat, lng: employee.geo.lng });
          map.fitBounds(bounds);
        });
      }

      setMap(map);
    },
    [employees]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!employeesLoading && employees.length > 0) {
      calculateCenter(employees);
    }
    if (mapRef.current && employees.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      const validEmployees = filterEmployeesWithValidGeo(employees);
      validEmployees.forEach((employee) => {
        bounds.extend({ lat: employee.geo.lat, lng: employee.geo.lng });
      });
      mapRef.current.fitBounds(bounds, { padding: 50 });
      //reduce zoom by 2 on load
      map.setZoom(map.getZoom() - 2);
    }
  }, [employees]);

  if (isLoaded) {
    if (!employeesLoading && employees.length > 0) {
      return (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={centerRef.current}
          zoom={12} // Increased zoom level for Seattle
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={options}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <>
            {employees.map((employee, index) => (
              <Marker
                key={index}
                position={employee.geo}
                // title={employee.email}
                onClick={() => setSelectedEmployee(employee)}
              />
            ))}

            {selectedEmployee && (
              <InfoWindow
                position={selectedEmployee.geo}
                onCloseClick={() => setSelectedEmployee(null)}
              >
                <div className="text-black">
                  <span className="">
                    <h2 className="text-black text-sm font-bold">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </h2>
                  </span>
                </div>
              </InfoWindow>
            )}
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
