"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";


const employeesData = [
    {
      userId: 100,
      location: {
        lat: -3.745,
        lng: -38.523,
      },
    },
    {
      userId: 200,
      location: {
          lat: -3.745 + 0.001, // Slightly adjust latitude
          lng: -38.523,
      },
    },
    {
      userId: 200,
      location: {
          lat: -3.745,
          lng: -38.523 - 0.001,
      },
    },
  ];

export const DashboardContext = createContext(null);

export default function DashboardContextProvider({ children }) {
  const [employees, setEmployees] = useState(employeesData);


  /*
  These setters will update the state and also update the indexedDB. There one for each state except for triggerMapReDraw.
  triggerMapReDraw is used to force a re-render of the map when the map view is changed. It is not stored in indexedDB

  the useCallback hook is used to memoize the setters so that they are not re-created on each render, because they are custom setters they are not automatically memoized by react
  */

  const employeesSetter = useCallback((data) => {
    setUsers(data);
  }, []);


  return (
    <DashboardContext.Provider
      value={{
        employees: employees,
        employeesSetter: employeesSetter
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/*

This approach exports the context as a custom hook.
An advantage of this approach is that it reduces the amount of code
needed to use the global context in a component.
This approach also handles the (error) case where a component tries to use
the global context outside of a DashboardContextProvider.

Usage (in client compoent only):
import { useDashboardContext } from "@/contexts/DashboardContext";
const {dashboardState, setDashboardState} = useDashboardContext();

*/

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContextProvider",
    );
  }
  return context;
}
