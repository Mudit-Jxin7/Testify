import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";

const createSpace = async (data: { name: string }) => {
    const token = Cookies.get("token");

    const res = await axios.post(`http://localhost:3000/api/space`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useCreateSpaceMutation = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: createSpace,
        onSuccess: (data) => {
            toast({
                title: `Space Created Successfully`,
                variant: "default",
            });
        },
        onError: (error) => {
            toast({
                title: `Something went wrong, please try later !!`,
                description: error.message,
                variant: "destructive",
            });
        },
    });
};

const getSpaces = async () => {
    const token = Cookies.get("token");

    const res = await axios.get(`http://localhost:3000/api/space`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useGetSpacesQuery = () => {
    return useQuery({
        queryKey: ["spaces"],
        queryFn: getSpaces,
        //@ts-ignore
        onError: (error: { message: any; }) => {
            toast({
                title: `Something went wrong, please try later !!`,
                description: error.message,
                variant: "destructive",
            });
        },
    });
};
