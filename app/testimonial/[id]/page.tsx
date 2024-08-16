"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useCreateTestimonialMutation } from "@/hooks/useTestimonialQuery";
import Navbar from "@/components/navbar";
import { useGetSpaceByNameQuery } from "@/hooks/useSpaceQuery";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Star } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSpaceByNameQuery(id);

  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [spaceId, setSpaceId] = useState<number | null>(null);

  const createTestimonialMutation = useCreateTestimonialMutation();

  const handleClick = (index: number) => {
    setRating(index + 1 === rating ? 0 : index + 1);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const spaceId = data?.space?.id;

    if (spaceId === null) return;

    createTestimonialMutation.mutate({
      photo: photo as string,
      email,
      customerName,
      testimonial,
      stars: rating,
      spaceId: spaceId,
      liked: false,
    });
    setSubmitted(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-full p-10 flex flex-col gap-10">
      <Navbar />
      <div className="container mx-auto p-10 flex flex-col">
        <Card className="mx-auto bg-white shadow-lg rounded-lg border border-gray-200 p-6 max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-700">
              {data?.space?.name}
            </CardTitle>
            <CardDescription className="text-lg text-gray-500 mt-2">
              {data?.space?.isCreated ? data?.space?.header : "Space Header"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-gray-700 mt-4">
            {data?.space?.isCreated
              ? data?.space?.message
              : "Space Description"}
          </CardContent>
          <CardContent className="mt-6">
            <p className="text-lg font-semibold text-gray-800">Questions</p>
            <div className="w-10 bg-purple-600 h-1 my-2"></div>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>Who are you / What are you working on?</li>
              <li>How has [our product/service] helped you?</li>
              <li>What is the best thing about [our product/service]?</li>
            </ul>
          </CardContent>
        </Card>
        {!submitted ? (
          <Dialog>
            <DialogTrigger>
              <Button
                className="bg-purple-600 text-center text-white py-3 px-6 rounded-lg mt-10 mx-auto block hover:bg-purple-700 transition-colors"
                size={"lg"}
              >
                Add a Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-700">
                  Write Testimonial for {data?.space?.name}
                </DialogTitle>
                <DialogDescription className="mt-6">
                  <p className="text-lg font-semibold text-gray-800">
                    Questions
                  </p>
                  <div className="w-10 bg-purple-600 h-1 my-2"></div>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Who are you / What are you working on?</li>
                    <li>How has [our product/service] helped you?</li>
                    <li>What is the best thing about [our product/service]?</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={24}
                      onClick={() => handleClick(index)}
                      className={`cursor-pointer transition ${
                        index < rating ? "text-yellow-400" : "text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <Textarea
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Write your Review"
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                />
                <Input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <div>
                  <p className="text-sm text-gray-600">Upload Your Photo</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mt-2"
                  />
                  {photo && (
                    <Avatar className="mt-4">
                      <AvatarImage src={photo as string} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox id="terms1" />
                  <div className="leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium text-gray-700"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-xs text-gray-500">
                      You agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                  size={"lg"}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Card className="mt-10 bg-green-100 text-center p-6 rounded-lg max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-700">
                Thank You!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              <p>Your testimonial has been submitted successfully.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Page;
