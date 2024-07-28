import React from "react";
import EditEmployeeForm from "@/components/EditEmployeeForm";

const getEmployeeById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/get-employee?id=${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch employee");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const EditEmployee = async ({params}) => {
  const { id } = params;

  //get current employee
  const res = await getEmployeeById(id);
  const employee = res.result
  console.log('employee in edit employee page: ',(employee))

  //destructure fields to update from returned employee
  const {firstName, lastName, email} = employee;

  //pass fields as props to edit employee form
  return <EditEmployeeForm id = {id} firstName={firstName} lastName={lastName} email={email} />;
};

export default EditEmployee;
