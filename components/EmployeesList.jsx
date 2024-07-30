import { useState, useEffect } from "react";
import Employee from "@/components/Employee";
// import { useDashboardContext } from "@/contexts/DashboardContext";

const EmployeesList = () => {
  // get emmployees from context
  // const { employees, setEmployees,  employeesLoading, setEmployeesLoading } = useDashboardContext();
  const [employees, setEmployees,] = useState()
  const [employeesLoading, setEmployeesLoading] = useState(true);

  //setEmployees to null initially
  // useEffect(() => {
  //   setEmployees(null);
  // }, []);


    // fetch all employees
    const fetchAllEmployees = async () => {
      try {
        setEmployeesLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-employees`, { cache: 'no-store' });
        if (!response.ok) throw new Error("Unable to fetch employees");
        const data = await response.json();
        setEmployees(data.data);
        setEmployeesLoading(false);
      } catch (error) {
        console.log(error);
        setEmployeesLoading(false);
      }
    };

    useEffect(() => {
      fetchAllEmployees();
    });



  return (
    //map over employees, pass data to employee component
    <div className=" min-h-screen mt-16 ">
      <h1>Employee List Component</h1>

      {employeesLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {employees.map((employee, index) => (
            <Employee key={employee.email + index} employee={employee} />
          ))}
        </div>
      )}

      {/* <Employee /> */}
    </div>
  );
};

export default EmployeesList;
