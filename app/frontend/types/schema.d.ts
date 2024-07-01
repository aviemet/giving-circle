import UserPreferences from './UserPreferences'
import UserTablePreferences from './UserTablePreferences'
export {}

declare global {
	declare namespace Schema {

		type CategoryTypes = 'Accessory' | 'Address' | 'Component' | 'Consumable' | 'Contact' | 'Contract' | 'Department' | 'Documentation' | 'Email' | 'Item' | 'License' | 'Location' | 'Manufacturer' | 'Model' | 'Order' | 'Person' | 'Phone' | 'Ticket' | 'User' | 'Vendor' | 'Vendor' | 'Website'

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
