import { useQuery } from "@tanstack/react-query";
import { getTransport } from "../services/transportApi";

export function useTransport() {
    return useQuery({
        queryKey: ["departures"],
        queryFn: getTransport,

        // Uppdaterar avgångarna varje minut
        refetchInterval: 60 * 1000,

        // Betraktar bussinformationen som aktuell i en minut
        staleTime: 60 * 1000,

        // Försöker igen en gång om anropet misslyckas
        retry: 1,
    });
}
