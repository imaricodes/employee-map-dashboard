"use client";

import React from "react";
import GoogleMap from "@/components/GoogleMap";
import EmployeesList from "@/components/EmployeesList";
import InfoBar from '@/components/InfoBar'

const Dashboard = () => {
  return (
    <div className="w-full bg-purple-400 h-full">
      <div className="bg-red-400 w-full h-16 fixed z-10"><InfoBar /></div>
      <div className="flex h-full">
      <div className="bg-green-400 w-3/5">
          {/* <GoogleMap /> */}
        </div>
        {/* employees list component here */}
        <div className="flex-grow h-full overflow-y-auto px-4">
          <EmployeesList />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
