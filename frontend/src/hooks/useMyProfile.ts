import { useQuery } from "@tanstack/react-query"
import { getMyProfile } from "../services/usersApi"

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
  })
}
