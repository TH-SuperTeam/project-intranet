import type { CreateNewsRequest } from "../types/CreateNewsRequest"
import type { News } from "../types/News"
import type { TargetAudience } from "../types/TargetAudience"
import { apiFetch } from "./api"

export const publishNews = async (news: CreateNewsRequest) => {
	const res = await apiFetch("/api/news", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(news),
	})

	if (!res.ok) {
		throw new Error("Kunde inte publicera nyheten.")
	}

	return res.json()
}

export interface PaginatedNews {
	content: News[]
	totalElements: number
	totalPages: number
	number: number
	size: number
	first: boolean
	last: boolean
}

export const getNews = async (
	audience: TargetAudience,
	page: number = 0,
	size: number = 10,
): Promise<PaginatedNews> => {
	
	const params = new URLSearchParams({
		targetAudience: audience,
		page: String(page),
		size: String(size),
	})

	const res = await apiFetch(`/api/news?${params}`)

	if (!res.ok) {
		throw new Error(`Kunde inte hämta nyheter (${res.status}).`)
	}

	return res.json()
}

export const getNewsById = async (
	id: number,
	audience: TargetAudience,
): Promise<News> => {
	const params = new URLSearchParams({
		targetAudience: audience,
	})

	const res = await apiFetch(`/api/news/${id}?${params}`)

	if (!res.ok) {
		throw new Error(`Kunde inte hämta nyheten (${res.status}).`)
	}

	return res.json()
}

export const updateNews = async (
	id: number,
	news: CreateNewsRequest,
): Promise<News> => {
	const res = await apiFetch(`/api/news/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(news),
	})

	if (!res.ok) {
		throw new Error(`Kunde inte uppdatera nyheten (${res.status}).`)
	}

	return res.json()
}

export const deleteNews = async (id: number): Promise<void> => {
	const res = await apiFetch(`/api/news/${id}`, {
		method: "DELETE",
	})

	if (!res.ok) {
		throw new Error("Kunde inte ta bort nyheten.")
	}
}
