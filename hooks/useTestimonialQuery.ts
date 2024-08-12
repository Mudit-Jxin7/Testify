import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { toast } from "@/components/ui/use-toast";

const createTestimonial = async (data: any) => {
    const token = Cookies.get("token");

    const res = await axios.post(`http://localhost:3000/api/testimonial`, data, {
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