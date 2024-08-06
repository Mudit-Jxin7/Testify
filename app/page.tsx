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
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
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
          <Dialog>
            <DialogTrigger>
              <Button
                className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                size={"lg"}
              >
                Create a new space
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Space</DialogTitle>
                <DialogDescription>
                  Please enter the name for your new space.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <Input
                  type="text"
                  className="border rounded-md p-2"
                  placeholder="Enter space name"
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                />
                <Button
                  className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                  onClick={handleCreateSpace}
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong</p>}
        {data && (
          <div className="flex flex-wrap gap-10 flex-row mt-4">
            {data.spaces.map((space: any) => (
              <Link
                className="cursor-pointer flex flex-row border-2 rounded-lg border-gray-300 bg-white shadow-sm p-4 gap-8 items-center hover:scale-105 transition-all"
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
