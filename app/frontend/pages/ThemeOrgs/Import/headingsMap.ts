import { type MappingItem } from '@/features/ImportMapping'

export const headingsMap: MappingItem[] = [
	{
		name: 'name',
		label: 'Name',
		forms: ['title', 'org', 'organization', 'name', 'org name', 'organization name'],
		type: String,
	},
	{
		name: 'ask',
		label: 'Ask',
		forms: ['ask', 'amount', 'request'],
		type: (val: string | number) => typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val,
	},
	{
		name: 'description',
		label: 'Description',
		forms: ['description', 'desc', 'about', 'details', 'info', 'project overview'],
		type: String,
	},
]
