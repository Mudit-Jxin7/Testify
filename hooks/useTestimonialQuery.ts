import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { apiURL } from "@/helper/apiURL";
import { toast } from "@/components/ui/use-toast";

const createTestimonial = async (data: any) => {
    const token = Cookies.get("token");

    const res = await axios.post(`${apiURL}/testimonial`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useCreateTestimonialMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTestimonial,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast({
                title: `Testimonial Send Successfully`,
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

const getTestimonialById = async (spaceId: any) => {
    const token = Cookies.get("token");

    const res = await axios.get(
        `${apiURL}/testimonial/${spaceId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return res.data;
};

export const useGetTestimonialByIdQuery = (spaceId: any) => {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: () => getTestimonialById(spaceId),
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

const likeTestimonial = async (id: any) => {
    const token = Cookies.get("token");
    const res = await axios.put(`${apiURL}/like/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

export const useLikeTestimonialQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: likeTestimonial,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });

            toast({
                title: 'Updated Hall of Fame',
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
