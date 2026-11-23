import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../services/programApi";

const usePrograms = () => {
    return useQuery({
        queryKey: ["programs"],
        queryFn: () => getPrograms(),
    });
};

export { usePrograms };
