import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserStatus } from "../../services/usersApi"
import type { Status } from "../../types/Status"

const useUpdateUserStatus = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ userId, status }: { userId: number; status: Status }) =>
			updateUserStatus(userId, status),

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			})
		},
	})
}

export default useUpdateUserStatus
