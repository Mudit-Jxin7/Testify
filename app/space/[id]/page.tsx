"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetSpaceByNameQuery,
  useUpdateSpaceQuery,
} from "@/hooks/useSpaceQuery";
import { useGetTestimonialByIdQuery } from "@/hooks/useTestimonialQuery";

import logo from "@/public/logo.svg";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "@phosphor-icons/react";

const Page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSpaceByNameQuery(id);
  const { mutate: updateSpace } = useUpdateSpaceQuery();
  const { data: testimonialData, isLoading: testimonialDataLoading } =
    useGetTestimonialByIdQuery(data?.space?.id);

  console.log(testimonialData);

  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  if (isLoading) return <div>Loading...</div>;

  const handleUpdateSpace = () => {
    if (!header || !message) {
      return;
    }

    updateSpace({
      id: data?.space?.id,
      name: data?.space?.name,
      header,
      message,
    });
  };

  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
      <Separator />
      <div className="flex flex-row gap-10 items-center px-40">
        <Image src={logo} alt="logo" />
        <div className="flex flex-col">
          <h1 className="text-2xl">Name: {data?.space?.name}</h1>
          <p className="text-md">
            Space Public URL :{" "}
            <Link
              href={`www.localhost:3000.com/testimonial/${data?.space?.name}`}
            >{`www.localhost:3000.com/testimonial/${data?.space?.name}`}</Link>
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
              <Card className="m-4">
                <CardHeader className="text-center uppercase gap-4">
                  <CardTitle className="text-3xl">
                    {data?.space?.name}
                  </CardTitle>
                  <CardDescription className="text-xl">
                    {data?.space?.isCreated
                      ? data?.space?.header
                      : "Space Header"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {data?.space?.isCreated
                    ? data?.space?.message
                    : "Space Description"}
                </CardContent>
                <CardContent>
                  <p className="text-lg uppercase">Questions</p>
                  <div className="w-10 bg-violet-700 h-1 my-2"></div>
                  <ul className="list-disc pl-5 text-slate-600 text-sm">
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
                    required
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                    className="border rounded-md p-2"
                    placeholder="Enter Header..."
                  />
                  <Input
                    type="text"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border rounded-md p-2"
                    placeholder="Enter Description..."
                  />
                  <Button
                    onClick={handleUpdateSpace}
                    className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                  >
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
          {testimonialDataLoading && <div>Loading...</div>}
          {testimonialData?.testimonials?.map((testimonial: any) => (
            <Card
              key={testimonial?.id}
              className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="flex flex-row justify-between items-center">
                <Badge
                  variant={"outline"}
                  className="w-24 justify-center mt-3 p-2 text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg"
                >
                  Text
                </Badge>
                <div className="flex flex-row gap-3">
                  <Heart
                    size={24}
                    className="text-red-500 cursor-pointer hover:text-red-600"
                  />
                  <Star
                    size={24}
                    className="text-yellow-400 cursor-pointer hover:text-yellow-500"
                  />
                </div>
              </div>

              <div className="flex gap-1">
                {Array.from({ length: testimonial?.stars }, (_, index) => (
                  <Star key={index} size={24} className="text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {testimonial?.testimonial}
              </p>

              <div className="flex flex-row justify-between items-center text-gray-500">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Name</p>
                  <p>{testimonial?.customerName}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Email</p>
                  <p>{testimonial?.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-gray-500">
                <p className="font-semibold">Submitted At</p>
                <p>{new Date(testimonial?.createdAt).toLocaleString()}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
