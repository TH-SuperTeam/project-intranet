import NewsCard from "./NewsCard"
import type { TargetAudience } from "../../types/TargetAudience"
import styles from "./News.module.css"
import { useNews } from "../../hooks/NewsHooks/useNews"
import { useState } from "react"

type NewsListProps = {
	audience: TargetAudience
}

const NewsList = ({ audience }: NewsListProps) => {
	const [page, setPage] = useState(0)

	const { data: news, isPending, isError } = useNews({ audience, page })

	if (isPending) {
		return <div className={styles.state}>Laddar nyheter...</div>
	}

	if (isError) {
		return (
			<div className={styles.errorState} role="alert">
				Det gick inte att ladda nyheterna.
			</div>
		)
	}

	if (news.content.length === 0) {
		return (
			<div className={styles.emptyState}>
				<h3>Inga nyheter att visa</h3>
				<p>Det finns inga publicerade nyheter just nu.</p>
			</div>
		)
	}

	const totalPages = news.totalPages
	const currentPage = news.number

	return (
		<>
			<ul className={styles.newsList}>
				{news.content.map(news => (
					<NewsCard key={news.id} news={news} />
				))}
			</ul>

			<nav className={styles.pagination} aria-label="Nyhetssidor">
				<button
					type="button"
					disabled={currentPage === 0}
					onClick={() => setPage(currentPage - 1)}
				>
					Föregående
				</button>

				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index}
						type="button"
						onClick={() => setPage(index)}
						aria-current={
							currentPage === index ? "page" : undefined
						}
					>
						{index + 1}
					</button>
				))}

				<button
					type="button"
					disabled={currentPage >= totalPages - 1}
					onClick={() => setPage(currentPage + 1)}
				>
					Nästa
				</button>
			</nav>
		</>
	)
}

export default NewsList
