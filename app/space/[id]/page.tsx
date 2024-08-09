"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

import logo from "@/public/logo.svg";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useGetSpaceByNameQuery } from "@/hooks/useSpaceQuery";

const page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSpaceByNameQuery(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
      <Separator />
      <div className="flex flex-row gap-10 items-center px-40">
        <Image src={logo} alt="logo" />
        <div className="flex flex-col">
          <h1 className="text-2xl">Name: {data?.space?.name}</h1>
          <p className="text-md">
            Space Public URL : <span>www.localhost:3000.com</span>
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between px-40">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">INBOX</h2>
          <p className="text-md font-normal cursor-pointer">All</p>
          <p className="text-md font-normal cursor-pointer">Texts</p>
          <p className="text-md font-normal cursor-pointer">Liked</p>
          <p className="text-md font-normal cursor-pointer">Hall of fame</p>
          <Dialog>
            <DialogTrigger>
              <p className="text-md font-normal text-left cursor-pointer">
                Preview
              </p>
            </DialogTrigger>
            <DialogContent>
              <Card>
                <CardHeader>
                  <CardTitle>{data?.space?.name}</CardTitle>
                  <CardDescription>
                    {data?.space?.isCreated
                      ? data?.space?.header
                      : "Space Header"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {data?.space?.isCreated
                    ? data?.space?.description
                    : "Space Description"}
                </CardContent>
                <CardContent>
                  <p>Questions</p>
                  <ul className="list-disc pl-5">
                    <li>Who are you / What you are working on?</li>
                    <li>How has [our product / service] helped you?</li>
                    <li>
                      What is the best thing about [our product / service]?
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
          {data?.space?.isCreated && (
            <Button
              className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
              size={"sm"}
              disabled={true}
            >
              Create Testimonial
            </Button>
          )}
          {!data?.space?.isCreated && (
            <Dialog>
              <DialogTrigger>
                <Button
                  className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                  size={"sm"}
                >
                  Create Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Testimonial</DialogTitle>
                  <DialogDescription>
                    Please fill the details.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Input
                    type="text"
                    className="border rounded-md p-2"
                    placeholder="Enter Header Name..."
                  />
                  <Input
                    type="text"
                    className="border rounded-md p-2"
                    placeholder="Enter Header Message..."
                  />
                  <Button className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors">
                    Create
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <div className="flex flex-col gap-6 w-3/5">
          <div className="flex flex-row gap-4">
            <Input />
            <Button
              className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
              size={"lg"}
            >
              Options
            </Button>{" "}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
