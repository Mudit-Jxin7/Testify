import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { apiURL } from "@/helper/apiURL";
import { toast } from "@/components/ui/use-toast";

const createSpace = async (data: { name: string }) => {
    const token = Cookies.get("token");

    const res = await axios.post(`${apiURL}/space`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useCreateSpaceMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSpace,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
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

    const res = await axios.get(`${apiURL}/space`, {
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
        onError: (error: { message: any }) => {
            toast({
                title: `Something went wrong, please try later !!`,
                description: error.message,
                variant: "destructive",
            });
        },
    });
};

const getSpaceByName = async (spaceName: any) => {
    const token = Cookies.get("token");

    const res = await axios.get(`${apiURL}/space/${spaceName}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useGetSpaceByNameQuery = (spaceName: any) => {
    return useQuery({
        queryKey: ["spaces"],
        queryFn: () => getSpaceByName(spaceName),
        //@ts-ignore
        onError: (error: { message: any }) => {
            toast({
                title: `Something went wrong, please try later !!`,
                description: error.message,
                variant: "destructive",
            });
        },
    });
};

const updateSpace = async ({
    id,
    name,
    header,
    message,
}: {
    id: string;
    name: string;
    header: string;
    message: string;
}) => {
    const token = Cookies.get("token");
    const res = await axios.put(
        `${apiURL}/createSpace`,
        {
            id,
            name,
            header,
            message,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return res.data;
};

export const useUpdateSpaceQuery = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSpace,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["spaces"] });
            toast({
                title: `Space Updated Successfully`,
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

