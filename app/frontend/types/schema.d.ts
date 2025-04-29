export {}

declare global {
	declare namespace Schema {

		interface Pagination {
			count: number
			pages: number
			limit: number
			current_page: number
			next_page: number
			prev_page: number
			is_first_page: boolean
			is_last_page: boolean
		}

		type CurrencyOption = {
			symbol: string
			code: string
		}
	}
}
