import React from 'react'

const AddEmployee = () => {
  return (
<form className='flex flex-col gap-3 mt-8'>
  <input type="text" className='border border-slate-500 px-8 py-2' placeholder="First Name" />
  <input type="text" className='border border-slate-500 px-8 py-2' placeholder="Last Name" />
  <input type="text" className='border border-slate-500 px-8 py-2' placeholder="Email" />

  <input type="text" className='border border-slate-500 px-8 py-2' placeholder="Assignment" />
  <input type="text" className='border border-slate-500 px-8 py-2' placeholder="Phone Number" />

  <button className='text-white py-3 px-6 w-fit bg-green-500'>Add Employee</button>


</form>
  )
}

export default AddEmployee