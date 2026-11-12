import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMyProfile } from "../../services/usersApi"
import type { UpdateProfileRequest } from "../../types/UpdateProfileRequest"

const useUpdateMyProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (profile: UpdateProfileRequest) => updateMyProfile(profile),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["myProfile"], updatedProfile)
    },
  })
}

export default useUpdateMyProfile
