"use client";

import React from "react";
import GoogleMap from "@/components/GoogleMap";

const Dashboard = () => {
  return (
    <div className="w-full bg-purple-400 h-screen">
        <div className="bg-red-400 w-full">
            selectors and filters
        </div>
      <div className="flex flex-col-reverse md:flex-row-reverse h-96">
        <div className="bg-yellow-300 grow">left side</div>
        <div className="bg-green-400 w-full h-full md:basis-[60%] ">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
