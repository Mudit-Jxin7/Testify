import Image from "next/image";

import OverviewCard from "@/components/overviewCard";
import logo from "@/public/logo.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <div className="flex flex-row gap-2">
        <Image src={logo} alt="logo" />
        <h2 className="font-medium text-xl text-gray-800">Testify</h2>
      </div>
      <div className="flex flex-col gap-4 py-20 px-48">
        <h2 className="font-medium text-3xl text-gray-800">Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <OverviewCard />
          <OverviewCard />
          <OverviewCard />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-48">
        <div className="flex flex-row justify-between">
          <h2 className="font-medium text-3xl text-gray-800">Spaces</h2>
          <Button
            className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
            size={"lg"}
          >
            Create a new space
          </Button>
        </div>
      </div>
    </div>
  );
}
