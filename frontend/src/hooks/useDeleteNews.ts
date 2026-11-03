import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteNews } from "../services/newsApi";

const useDeleteNews = () => {
    const queryClient = useQueryClient();

    // useNavigate är en React Router-hook som låter oss navigera till andra sidor programmatiskt, exempelvis efter att en nyhet har tagits bort.
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: deleteNews,

        onSuccess: () => {
            // Uppdaterar nyhetslistan efter borttagning
            queryClient.invalidateQueries({ queryKey: ["news"] });

            // Navigerar tillbaka till nyhetslistan efter
            navigate("/news", {
                state: { successMessage: "Nyheten har raderats." },
            });
        },
    });

    return mutation;
};

export { useDeleteNews };
