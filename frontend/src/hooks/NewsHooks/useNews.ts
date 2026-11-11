import { useQuery } from "@tanstack/react-query"
import { getNews } from "../../services/newsApi"
import type { TargetAudience } from "../../types/TargetAudience"

type NewsProps = {
	audience: TargetAudience
	page?: number
	size?: number
}

const useNews = ({ audience, page = 0, size = 10 }: NewsProps) => {
	return useQuery({
		queryKey: ["news", audience, page, size],
		queryFn: () => getNews(audience, page, size),
	})
}

export { useNews }
