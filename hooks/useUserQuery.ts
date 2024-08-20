import {
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { apiURL } from "@/helper/apiURL";
import { toast } from "@/components/ui/use-toast";

const loginUser = async (data: TLoginUser) => {
  const res = await axios.post(`${apiURL}/auth/login`, {
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export const useLoginUserQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast({
        title: `User Logged In`,
        variant: "default",
      });
      Cookies.set("token", data.token);
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: `Login Failed`,
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

const registerUser = async (data: TRegisterUser) => {
  const res = await axios.post(`${apiURL}/auth/register`, {
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return res.data;
};

export const useRegisterUserQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast({
        title: `User Registered Successfully , Please Login`,
        variant: "default",
      });
      router.push("/auth/login");
    },
    onError: (error) => {
      toast({
        title: `Registration failed`,
        description: error.message,
        variant: "destructive",
      });
    },
  });
};