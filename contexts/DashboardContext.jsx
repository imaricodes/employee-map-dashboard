"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export const DashboardContext = createContext(null);

export default function DashboardContextProvider({ children }) {
  const [employees, setEmployees] = useState();
  const [employeesLoading, setEmployeesLoading] = useState(true);

  //set initial employees
  // useEffect(() => {
  //   const fetchAllEmployees = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-employees`,
  //         { cache: "no-store" }
  //       );
  //       if (!response.ok) throw new Error("Unable to fetch employees");
  //       const data = await response.json();
  //       const employees = data.data;
  //       // console.log("employees in dashboard context AllEmployees", employees);
  //       setEmployees(employees);
  //       setEmployeesLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchAllEmployees();
  // }, []);

  /*

  The useCallback hook is used to memoize the setters so that they are not re-created on each render, because they are custom setters they are not automatically memoized by react
  */

  const employeesSetter = useCallback((data) => {
    setUsers(data);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        employees: employees,
        employeesLoading: employeesLoading,
        setEmployeesLoading: setEmployeesLoading,
        employeesSetter: employeesSetter,
        setEmployees: setEmployees,
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
      "useDashboardContext must be used within a DashboardContextProvider"
    );
  }
  return context;
}
