"use client";
import { useState } from "react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OverviewCard from "@/components/overviewCard";
import { Button } from "@/components/ui/button";
import {
  useGetSpacesQuery,
  useCreateSpaceMutation,
} from "@/hooks/useSpaceQuery";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/navbar";

export default function Home() {
  const { data, isLoading, isError } = useGetSpacesQuery();
  const { mutate } = useCreateSpaceMutation();
  const [spaceName, setSpaceName] = useState("");

  const handleCreateSpace = () => {
    if (!spaceName) return;
    mutate({ name: spaceName });
    setSpaceName("");
  };

  return (
    <div className="min-h-screen p-10 flex flex-col gap-10 bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <div className="flex flex-col gap-4 py-20 px-48">
        <h2 className="font-semibold text-4xl text-gray-800">Overview</h2>
        <div className="grid grid-cols-3 gap-6">
          <OverviewCard />
          <OverviewCard />
          <OverviewCard />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-48">
        <div className="flex flex-row justify-between items-center">
          <h2 className="font-semibold text-4xl text-gray-800">Spaces</h2>
          <Dialog>
            <DialogTrigger>
              <Button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">
                Create a new space
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">
                  Create a New Space
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Please enter the name for your new space.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter space name"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                />
                <Button
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                  onClick={handleCreateSpace}
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {isLoading && <p className="text-gray-500">Loading...</p>}
        {isError && <p className="text-red-500">Something went wrong</p>}
        {data && (
          <div className="flex flex-wrap gap-6 mt-4">
            {data.spaces.map((space: any) => (
              <Link
                className="cursor-pointer flex flex-row border border-gray-300 rounded-lg bg-white shadow-sm p-4 gap-8 items-center hover:shadow-lg hover:scale-105 transition transform duration-300"
                key={space.id}
                href={`/space/${space.name}`}
              >
                {space.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
