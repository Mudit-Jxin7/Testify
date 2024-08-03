"use client";
import React from "react";
import { VideoCamera } from "@phosphor-icons/react";

const OverviewCard = () => {
  return (
    <div className="cursor-pointer flex flex-row border-2 rounded-lg border-gray-300 bg-white shadow-sm p-4 gap-8 items-center hover:scale-105 transition-all">
      <VideoCamera size={24} />
      <div className="flex flex-col">
        <p>Videos</p>
        <p className="font-bold">0</p>
      </div>
    </div>
  );
};

export default OverviewCard;
