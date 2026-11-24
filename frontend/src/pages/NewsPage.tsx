import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "../components/News/News.module.css"
import NewsList from "../components/News/NewsList"
import CreateButton from "../components/common/CreateButton"
import SearchInput from "../components/common/SearchInput"

import { useAudience } from "../hooks/useAudience"
import { useCanManageNews } from "../hooks/NewsHooks/useCanManageNews"

const NewsPage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	const [successMessage] = useState<string>(
		() => location.state?.successMessage ?? "",
	)

	// Hämtar sökningen från URL:en
	const search = searchParams.get("search") ?? ""

	const [debouncedSearch, setDebouncedSearch] = useState(search)

	// Uppdaterar sökningen och återställer sidnumret
	const handleSearchChange = (value: string) => {
		setSearchParams(
			previous => {
				const params = new URLSearchParams(previous)

				if (value) {
					params.set("search", value)
				} else {
					params.delete("search")
				}

				params.delete("page") // Återställ sidnumret när sökningen ändras

				return params
			},
			{ replace: true },
		)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search)
		}, 300)

		return () => clearTimeout(timer)
	}, [search])

	useEffect(() => {
		if (location.state?.successMessage) {
			navigate(location.pathname, {
				replace: true,
				state: null,
			})
		}
	}, [location.state, location.pathname, navigate])

	const { audience } = useAudience()
	const canManageNews = useCanManageNews()

	return (
		<main className={styles.newsSection}>
			<header className={styles.header}>
				<h1>Nyheter</h1>

				{canManageNews && (
					<CreateButton to="/news/create">+ Skapa nyhet</CreateButton>
				)}
			</header>

			<div className={styles.searchContainer}>
				<SearchInput
					value={search}
					onChange={handleSearchChange}
					placeholder="Sök bland nyheter..."
				/>
			</div>

			{successMessage && (
				<p role="status" className={styles.successMessage}>
					{successMessage}
				</p>
			)}

			<NewsList audience={audience} search={debouncedSearch} />
		</main>
	)
}

export default NewsPage
