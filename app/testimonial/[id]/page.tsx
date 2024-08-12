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
            <li>Who are you / What are you working on?</li>
            <li>How has [our product / service] helped you?</li>
            <li>What is the best thing about [our product / service]?</li>
          </ul>
        </CardContent>
      </Card>
      {!submitted ? (
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
              <DialogTitle>Write testimonial to</DialogTitle>
              <DialogDescription className="mt-8">
                <p className="text-md uppercase">Questions</p>
                <div className="w-10 bg-violet-700 h-1 my-2"></div>
                <ul className="list-disc pl-5 text-slate-600 text-sm">
                  <li>Who are you / What are you working on?</li>
                  <li>How has [our product / service] helped you?</li>
                  <li>What is the best thing about [our product / service]?</li>
                </ul>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-6">
              <div className="flex flex-row gap-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    onClick={() => handleClick(index)}
                    className={
                      index < rating ? "text-yellow-500" : "text-gray-400"
                    }
                  />
                ))}
              </div>
              <Textarea
                className="border rounded-none border-slate-500"
                placeholder="Write your Review"
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
              />
              <Input
                className="border rounded-none border-slate-500"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="border rounded-none border-slate-500"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <div>
                <p>Upload Your Photo</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {photo && (
                  <Avatar>
                    <AvatarImage src={photo as string} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="items-top flex space-x-2 mt-2">
                <Checkbox id="terms1" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
              <Button
                className="bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
                size={"lg"}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Card className="m-4 w-1/3 mx-auto bg-green-100 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your testimonial has been submitted successfully.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
