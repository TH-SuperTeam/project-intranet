import { useQuery } from "@tanstack/react-query"
import { getClassroomsToday } from "../../services/classroomApi"

export const useClassroomsToday = () =>
  useQuery({
    queryKey: ["classroomsToday"],
    queryFn: getClassroomsToday,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })
