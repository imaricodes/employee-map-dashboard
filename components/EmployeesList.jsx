import { useState, useEffect } from "react";
import Employee from "@/components/Employee";
import { useDashboardContext } from "@/contexts/DashboardContext";

const EmployeesList = () => {
  // get emmployees from context
  const { employees, employeesLoading } = useDashboardContext();

  useEffect(() => {
    console.log("employees in employee list", employees);
  }, [employees]);

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
