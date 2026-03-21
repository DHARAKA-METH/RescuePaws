import { useQuery } from "@tanstack/react-query";
import { getDogs } from "../services/dogService";
import toast from "react-hot-toast";

export const useDogs = () => {
  return useQuery({
    queryKey: ["dogs"],
    queryFn: getDogs,

    onError: (error) => {
      toast.error(error.message || "Error loading dogs");
    },
  });
};