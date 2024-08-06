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

const page = () => {
  const { id } = useParams();

  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
      <Separator />
      <div className="flex flex-row gap-10 items-center px-40">
        <Image src={logo} alt="logo" />
        <div className="flex flex-col">
          <h1 className="text-2xl">Name: {id}</h1>
          <p className="text-md">
            Space Public URL : <span>www.localhost:3000.com</span>
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row justify-between px-40">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-medium">INBOX</h2>
          <p className="text-md font-normal">All</p>
          <p className="text-md font-normal">Texts</p>
          <p className="text-md font-normal">Liked</p>
          <p className="text-md font-normal">Hall of fame</p>
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
