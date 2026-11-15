import { useQuery } from "@tanstack/react-query"
import { getNews } from "../../services/newsApi"
import type { TargetAudience } from "../../types/TargetAudience"

type NewsProps = {
	audience: TargetAudience
	page?: number
	size?: number
	search?: string
}

const useNews = ({ audience, page = 0, size = 10, search = "" }: NewsProps) => {
	return useQuery({
		queryKey: ["news", audience, page, size, search],
		queryFn: () => getNews(audience, page, size, search),
	})
}

export { useNews }
