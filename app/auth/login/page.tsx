"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLoginUserQuery } from "@/hooks/useUserQuery";
import { userLoginSchema } from "@/helper/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const LoginPage: React.FC = () => {
  const { mutate, isPending } = useLoginUserQuery();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof userLoginSchema>) {
    mutate(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition-colors"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
