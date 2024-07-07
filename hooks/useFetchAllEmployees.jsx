import { useState, useEffect, useCallback } from "react";
import { DashboardContext } from "@/contexts/DashboardContext";

const useFetchAllEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState(null);
  const { employeesSetter } = DashboardContext();

  const fetchAllEmployees = useCallback(
    async (id) => {
      // Consider implementing fetch caching for improved performance
      try {
        const response = await fetch("/api/getEmployees");
        if (!response.ok) throw new Error("Unable to fetch employees");
        const data = await response.json();
        const employees = data.data;
        console.log("employees in useFetchAllEmployees", employees);

        // Update state using a callback or custom hook (recommended)
        setEmployees(employees);
        employeesSetter(employees);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    [employeesSetter, setLoading]
  );

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return { loading, error };
};

export default useFetchAllEmployees;
