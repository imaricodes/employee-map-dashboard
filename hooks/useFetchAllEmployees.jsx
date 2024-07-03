import { useState, useEffect, useCallback } from "react";
import { useDashboardContext } from "@/context/DashboardContext";

const useFetchAllEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employeesSetter } =
    useDashboardContext();


    const fetchAllEmployees = useCallback(async (id) => {
      // Consider implementing fetch caching for improved performance
      try {
        const response = await fetch(`/api/user-device-data?userId=${id}`);
        if (!response.ok) throw new Error('Unable to fetch employees');
        const data = await response.json();

        console.log('employees:', data.employees);

        // Spread operator creates a new array to avoid mutation
        const employees = [...data.employees];
        console.log(employees);

        // Update state using a callback or custom hook (recommended)
        employeesSetter(employees);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }, [employeesSetter, setLoading]);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return { loading, error };
};

export default useFetchAllEmployees;
