'use client'

import React from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const Employee = ({ employee }) => {
  return (
    <div className="p-4 border border-slate-300 mb-3 flex justify-between">
      <div>
        <h2 className="font-bold text-2xl">
          {employee.firstName} {employee.lastName}
        </h2>
        <p>Assignment: {employee.locationName}</p>
        {employee.phone && (
          <p className="text-xs">Phone: {employee.phone}</p>
        )}
        <p className="text-xs mb-4">Email: {employee.email}</p>
        <div className=" bg-green-500 py-1 px-2 text-center">
        <Link href="/addEmployee/123" className="text-white">Add Assignment</Link>
      </div>
      </div>


      <div className="flex gap-2 items-start">
        <RemoveBtn />
        <Link href={`/editEmployee/${employee._id}`}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Employee;
