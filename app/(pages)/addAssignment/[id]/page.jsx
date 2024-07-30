import React from 'react'


// borrow logic from edit employee page and form
// update getEmployeeById function, borrow from
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

const page = async ({params}) => {
  const {id} = params;

// get employee who's geometry will be updated
// need to import an add assignment form (pass id)

 //get current employee
 const res = await getEmployeeById(id);
 const employee = res.result
 console.log('employee in edit addAssignment page: ',(employee))

 // here destructure geo, lat, lng?
 // what if null?


  return (
    <div>Add Assignment form here?</div>
  )
}

export default page