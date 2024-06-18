import { ENV } from '@/env'

export const api = (path: string, unit?: RequestInit) => {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const apiPrefix = ''
	const url = new URL(apiPrefix.concat(path), baseUrl)

	return fetch(url, unit)
}
