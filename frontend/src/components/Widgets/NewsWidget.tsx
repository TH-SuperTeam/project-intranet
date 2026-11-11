import { Link } from "react-router-dom"
import { Newspaper, ArrowRight } from "lucide-react"
import { useNews } from "../../hooks/NewsHooks/useNews"
import type { TargetAudience } from "../../types/TargetAudience"
import styles from "./Widgets.module.css"

interface NewsWidgetProps {
	audience: TargetAudience
}

const NewsWidget = ({ audience }: NewsWidgetProps) => {
	const { data: news, isPending, isError } = useNews({ audience })

	if (isPending) {
		return (
			<section className={styles.newsWidget}>
				<p>Laddar nyheter...</p>
			</section>
		)
	}

	if (isError) {
		return (
			<section className={styles.newsWidget}>
				<p role="alert">Det gick inte att ladda nyheterna.</p>
			</section>
		)
	}

	const latestNews = news.content.slice(0, 3)

	return (
		<section className={styles.newsWidget}>
			<div className={styles.widgetHeader}>
				<div className={styles.widgetTitle}>
					<Newspaper size={24} />
					<h2>Skolnyheter</h2>
				</div>

				<Link to="/news" className={styles.viewAll}>
					Visa alla nyheter
					<ArrowRight size={18} />
				</Link>
			</div>

			{latestNews.length === 0 ? (
				<p className={styles.emptyState}>
					Det finns inga publicerade nyheter just nu.
				</p>
			) : (
				<ul className={styles.newsList}>
					{latestNews.map(item => (
						<li key={item.id}>
							<Link
								to={`/news/${item.id}`}
								className={styles.newsItem}
							>
								<div className={styles.newsContent}>
									<h3>{item.title}</h3>

									<p>{item.content}</p>

									<time dateTime={item.createdAt}>
										{new Date(
											item.createdAt,
										).toLocaleDateString("sv-SE", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</time>
								</div>

								<ArrowRight
									size={18}
									className={styles.newsArrow}
								/>
							</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}

export default NewsWidget
