import React from "react";
import Link from "next/link";

const InfoBar = () => {
  return (
    <div className="w-full px8 py-3 flex justify-between">
      <Link className="font-bold" href="/addEmployee">
        Add Employee
      </Link>
    </div>
  );
};

export default InfoBar;
