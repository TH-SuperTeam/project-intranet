import { useMutation } from "@tanstack/react-query"
import { changePassword } from "../../services/usersApi"
import type { ChangePasswordRequest } from "../../types/ChangePasswordRequest"

const useChangePassword = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) => changePassword(request),
  })
}

export default useChangePassword
