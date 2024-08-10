"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import Navbar from "@/components/navbar";
import { useGetSpaceByNameQuery } from "@/hooks/useSpaceQuery";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSpaceByNameQuery(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
      <Card className="m-4 w-1/3 mx-auto bg-inherit">
        <CardHeader className="text-center uppercase gap-4">
          <CardTitle className="text-3xl">{data?.space?.name}</CardTitle>
          <CardDescription className="text-xl">
            {data?.space?.isCreated ? data?.space?.header : "Space Header"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data?.space?.isCreated ? data?.space?.message : "Space Description"}
        </CardContent>
        <CardContent>
          <p className="text-lg uppercase">Questions</p>
          <div className="w-10 bg-violet-700 h-1 my-2"></div>
          <ul className="list-disc pl-5 text-slate-600 text-sm">
            <li>Who are you / What you are working on?</li>
            <li>How has [our product / service] helped you?</li>
            <li>What is the best thing about [our product / service]?</li>
          </ul>
        </CardContent>
      </Card>
      <Dialog>
        <DialogTrigger>
          <Button
            className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
            size={"lg"}
          >
            Add a text
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Space</DialogTitle>
            <DialogDescription>
              Please enter the name for your new space.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
