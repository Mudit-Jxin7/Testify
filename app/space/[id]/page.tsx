"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetSpaceByNameQuery,
  useUpdateSpaceQuery,
} from "@/hooks/useSpaceQuery";
import {
  useGetTestimonialByIdQuery,
  useLikeTestimonialQuery,
} from "@/hooks/useTestimonialQuery";

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
import { SkeletonPage } from "@/components/skeletonLg";
import { SkeletonCard } from "@/components/skeletonSm";

const Page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSpaceByNameQuery(id);
  const { mutate: updateSpace } = useUpdateSpaceQuery();
  const { data: testimonialData, isLoading: testimonialDataLoading } =
    useGetTestimonialByIdQuery(data?.space?.id);

  const { mutate: likeTestimonial } = useLikeTestimonialQuery();

  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  if (isLoading) return <SkeletonPage />;

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

  const handleLikeClick = (testimonialId: number) => {
    likeTestimonial(testimonialId);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans py-8">
      <div className="px-20 mb-8">
        <Navbar />
      </div>
      <Separator />
      <div className="flex flex-col gap-10 p-10">
        <div className="flex flex-row gap-10 items-center px-20">
          <Image src={logo} alt="logo" className="w-24 h-24" />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{data?.space?.name}</h1>
            <p className="text-lg text-gray-600">
              Space Public URL :{" "}
              <Link
                href={`/testimonial/${data?.space?.name}`}
                className="text-blue-600 hover:underline"
              >{`localhost:3000.com/testimonial/${data?.space?.name}`}</Link>
            </p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-row justify-between px-20 gap-10">
          <div className="flex flex-col gap-6 w-1/4">
            <h2 className="text-2xl font-semibold">INBOX</h2>
            <p className="text-lg font-medium cursor-pointer hover:text-gray-800">
              All
            </p>
            <p className="text-lg font-medium cursor-pointer hover:text-gray-800">
              Texts
            </p>
            <p className="text-lg font-medium cursor-pointer hover:text-gray-800">
              Liked
            </p>
            <Dialog>
              <DialogTrigger>
                <p className="text-lg font-medium text-left cursor-pointer">
                  Hall Of fame
                </p>
              </DialogTrigger>
              <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                <Card className="m-4 p-6 bg-gray-100 rounded-lg shadow">
                  <CardHeader className="text-center gap-4">
                    <CardTitle className="text-3xl font-semibold text-gray-700">
                      Embed Testimonials
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-500">
                      Choose a layout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row justify-between">
                      <p>Masonry Animated</p>
                      <p>Masonry Fixed</p>
                      <p>Carousel</p>
                    </div>
                  </CardContent>
                  <CardDescription className="flex justify-center mt-6">
                    <Button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">
                      Copy Code
                    </Button>
                  </CardDescription>
                </Card>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <p className="text-lg font-medium text-left cursor-pointer text-blue-600 hover:underline">
                  Preview
                </p>
              </DialogTrigger>
              <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                <Card className="m-4 p-6 bg-gray-100 rounded-lg shadow">
                  <CardHeader className="text-center gap-4">
                    <CardTitle className="text-3xl font-semibold text-gray-700">
                      {data?.space?.name}
                    </CardTitle>
                    <CardDescription className="text-xl text-gray-500">
                      {data?.space?.isCreated
                        ? data?.space?.header
                        : "Space Header"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-lg text-gray-700">
                    {data?.space?.isCreated
                      ? data?.space?.message
                      : "Space Description"}
                  </CardContent>
                  <CardContent>
                    <p className="text-lg font-semibold uppercase">Questions</p>
                    <div className="w-10 bg-violet-700 h-1 my-2"></div>
                    <ul className="list-disc pl-5 text-gray-600 text-sm">
                      <li>Who are you / What are you working on?</li>
                      <li>How has [our product/service] helped you?</li>
                      <li>
                        What is the best thing about [our product/service]?
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </DialogContent>
            </Dialog>
            {data?.space?.isCreated && (
              <Button
                className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
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
                    className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                    size={"sm"}
                  >
                    Create Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                      Create a Testimonial
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Please fill the details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <Input
                      type="text"
                      required
                      value={header}
                      onChange={(e) => setHeader(e.target.value)}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Enter Header..."
                    />
                    <Input
                      type="text"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Enter Description..."
                    />
                    <Button
                      onClick={handleUpdateSpace}
                      className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                    >
                      Create
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="flex flex-col gap-6 w-3/4">
            <div className="flex flex-row gap-4 items-center">
              <Input
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Button
                className="bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                size={"lg"}
              >
                Options
              </Button>
            </div>
            {testimonialDataLoading && (
              <div className="flex flex-wrap gap-5">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            )}
            {testimonialData?.testimonials?.map((testimonial: any) => (
              <Card
                key={testimonial?.id}
                className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition hover:shadow-xl"
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
                      className={`cursor-pointer ${
                        testimonial?.liked ? "text-red-500" : "text-gray-400"
                      } hover:text-red-600 transition`}
                      onClick={() => handleLikeClick(testimonial?.id)}
                    />
                    <Star
                      size={24}
                      className="text-yellow-400 cursor-pointer hover:text-yellow-500 transition"
                    />
                  </div>
                </div>

                <div className="flex gap-1 my-2">
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

                <div className="flex flex-col gap-1 text-gray-500 mt-4">
                  <p className="font-semibold">Submitted At</p>
                  <p>{new Date(testimonial?.createdAt).toLocaleString()}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
