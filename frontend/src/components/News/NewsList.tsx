import NewsCard from "./NewsCard"
import type { TargetAudience } from "../../types/TargetAudience"
import styles from "./News.module.css"
import { useNews } from "../../hooks/NewsHooks/useNews"
import { useSearchParams } from "react-router-dom"
import Pagination from "../common/Pagination"
import { ListSkeleton } from "../Loaders/Skeletons/ListSkeleton"

type NewsListProps = {
	audience: TargetAudience
	search: string
}

const NewsList = ({ audience, search }: NewsListProps) => {
	const [searchParams, setSearchParams] = useSearchParams()

	// Hämtar och validerar sidnumret från URL:en
	const pageParam = Number(searchParams.get("page") ?? "0")
	const page =
		Number.isSafeInteger(pageParam) && pageParam >= 0 ? pageParam : 0

	// Uppdaterar sidnumret och behåller övriga URL-parametrar
	const handlePageChange = (newPage: number) => {
		setSearchParams(previous => {
			const params = new URLSearchParams(previous)

			if (newPage === 0) {
				params.delete("page")
			} else {
				params.set("page", String(newPage))
			}
			return params
		})
	}

	const {
		data: news,
		isPending,
		isError,
	} = useNews({ audience, page, search })

	if (isPending) {
    return <ListSkeleton variant="news" />
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
                {search.trim() ? (
                    <>
                        <h3>Inga sökresultat</h3>
                        <p>Inga nyheter matchade din sökning.</p>
                    </>
                ) : (
                    <>
                        <h3>Inga nyheter att visa</h3>
                        <p>Det finns inga publicerade nyheter just nu.</p>
                    </>
                )}
            </div>
        );
    }


return (
        <>
            <ul className={styles.newsList}>
                {news.content.map((news) => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </ul>

            <Pagination
                currentPage={news.number}
                totalPages={news.totalPages}
                onPageChange={handlePageChange}
                ariaLabel="Nyhetssidor"
            />
        </>
    );
};

export default NewsList;