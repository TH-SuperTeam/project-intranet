import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateNews } from "../services/newsApi";
import type { CreateNewsRequest } from "../types/CreateNewsRequest";

const useUpdateNews = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: ({ id, news }: { id: number; news: CreateNewsRequest }) =>
            updateNews(id, news),

        //_ (nämner man den så undviker man klagomål från ts när man inte använder den) är originalnyheten innan redigering, updatedNewsData är den redigerade nyheten
        onSuccess: (_, updatedNewsData) => {
            queryClient.invalidateQueries({ queryKey: ["news"] });

            setTimeout(() => {
                navigate(`/news/${updatedNewsData.id}`);
            }, 2000);
        },
    });

    return mutation;
};

export { useUpdateNews };
