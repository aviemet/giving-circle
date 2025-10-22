import { PresentationDataContextValue } from "@/layouts/Providers/PresentationDataProvider"

type DataAccess = {
	model: string
	name: string
	fields: Record<string, string>
	collections?: DataAccess[]
}

export const dataAccess: DataAccess[] = [
	// Circle
	{
		model: "circle",
		name: "Circle",
		fields: {
			name: "string",
		},
	},

	// Theme
	{
		model: "theme",
		name: "Theme",
		fields: {
			name: "string",
			status: "string",
		},
	},

	// Presentation
	{
		model: "presentation",
		name: "Presentation",
		fields: {
			name: "string",
		},

		// Nested Presentation collections
		collections: [
			// Orgs
			{
				model: "org",
				name: "Organization",
				fields: {
					name: "string",
					description: "string",
					ask: "currency",
				},
			},
			// Members
			{
				model: "membership",
				name: "Member",
				fields: {
					name: "string",
					number: "string",
					funds: "currency",
				},
			},
		],
	},
]

export const getFlatOptions = (dataAccess: DataAccess[]) => {
	const options: Array<{ value: string, label: string, group?: string }> = []

	dataAccess.forEach(item => {
		Object.keys(item.fields).forEach(field => {
			options.push({
				value: `${item.model}.${field}`,
				label: `${item.name} - ${field}`,
			})
		})

		if(item.collections) {
			item.collections.forEach(collection => {
				Object.keys(collection.fields).forEach(field => {
					options.push({
						value: `${item.model}.${collection.model}[].${field}`,
						label: `${item.name} → ${collection.name} - ${field}`,
						group: collection.name,
					})
				})
			})
		}
	})

	return options
}

interface DataStructure {
	circle: Schema.CirclesMock | Schema.CirclesPersisted
	theme: {
		name: string
		status: string
	}
	presentation: {
		name: string
		org: Schema.OrgsPersisted[]
		membership: Schema.MembershipsPersisted[]
	}
}

export const buildDataStructure = (dataAccess: DataAccess[], contextData: PresentationDataContextValue): DataStructure => {
	const isMockCircle = "themes" in contextData.circle && "orgs" in contextData.circle && "memberships" in contextData.circle
	const mockCircle = isMockCircle ? contextData.circle as Schema.CirclesMock : null

	const structure: DataStructure = {
		circle: contextData.circle,
		theme: contextData.theme || (mockCircle?.themes?.[0]) || { name: "Sample Theme", status: "active" },
		presentation: {
			name: contextData.presentation?.name || "Sample Presentation",
			org: mockCircle?.orgs || [],
			membership: mockCircle?.memberships || [],
		},
	}

	return structure
}
