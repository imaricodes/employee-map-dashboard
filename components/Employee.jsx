import React from "react";
import RemoveBtn from "@/components/RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const Employee = () => {
  return (
    <div className="p-4 border border-slate-300 mb-3 flex justify-between">
      <div>
        <h2 className="font-bold text-2xl">Jone Doe</h2>
        <p>Assignment: Taco Smell</p>
        <p className="text-xs">Contact: 206-555-5555</p>
      </div>

      <div className="flex gap-2 items-start">
        <RemoveBtn />
        <Link href="/editEmployee/123">
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Employee;
