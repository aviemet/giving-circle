import { type PresentationDataContextValue, type PresentationDataValue } from "@/features/presentation/PresentationDataProvider"
import { filterFinalistOrgs } from "@/features/presentation/values/finalists"

export type ContextOrg =
	| Schema.OrgsPersisted
	| Schema.PresentationsOrgsPersisted

export type TagOption = {
	value: string
	label: string
	group?: string
}

type TagSchemaNode = {
	model: string
	name: string
	fields: Record<string, string>
	collections?: TagSchemaNode[]
}

export function getOrgsFromContext(contextData: PresentationDataValue | null | undefined): ContextOrg[] {
	const presentation = contextData?.presentation
	if(presentation && "orgs" in presentation && Array.isArray(presentation.orgs) && presentation.orgs.length > 0) {
		return presentation.orgs
	}

	if(contextData?.circle && "orgs" in contextData.circle && Array.isArray(contextData.circle.orgs)) {
		const circleOrgs = contextData.circle.orgs
		if(circleOrgs.length > 0) {
			return circleOrgs
		}
	}

	return []
}

const tagSchema: TagSchemaNode[] = [
	{
		model: "circle",
		name: "Circle",
		fields: {
			name: "string",
		},
	},
	{
		model: "theme",
		name: "Theme",
		fields: {
			name: "string",
			heading: "string",
			description: "string",
			status: "string",
		},
	},
	{
		model: "presentation",
		name: "Presentation",
		fields: {
			name: "string",
		},
		collections: [
			{
				model: "org",
				name: "Organization",
				fields: {
					name: "string",
					description: "string",
					ask: "currency",
				},
			},
			{
				model: "finalist_org",
				name: "Finalist organization",
				fields: {
					name: "string",
					description: "string",
					ask: "currency",
				},
			},
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

function flattenTagSchema(schema: TagSchemaNode[]): TagOption[] {
	const options: TagOption[] = []

	for(const item of schema) {
		for(const field of Object.keys(item.fields)) {
			options.push({
				value: `${item.model}.${field}`,
				label: `${item.name} - ${field}`,
			})
		}

		if(item.collections === undefined) {
			continue
		}

		for(const collection of item.collections) {
			for(const field of Object.keys(collection.fields)) {
				options.push({
					value: `${item.model}.${collection.model}[].${field}`,
					label: `${item.name} → ${collection.name} - ${field}`,
					group: collection.name,
				})
			}
		}
	}

	return options
}

export const tagOptions = flattenTagSchema(tagSchema)

export interface TagData {
	circle: Schema.CirclesMock | Schema.CirclesPersisted
	theme: {
		name: string
		heading?: string
		description?: string
		status: string
	}
	presentation: {
		name: string
		org: ContextOrg[]
		finalist_org: ContextOrg[]
		membership: Schema.MembershipsPersisted[]
	}
}

function circleHasCollections(circle: Schema.CirclesMock | Schema.CirclesPersisted): circle is Schema.CirclesMock {
	return "themes" in circle && "orgs" in circle && "memberships" in circle
}

export function buildTagData(contextData: PresentationDataContextValue): TagData {
	const circleWithCollections = circleHasCollections(contextData.circle) ? contextData.circle : null
	const presentationOrgs = getOrgsFromContext(contextData)

	return {
		circle: contextData.circle,
		theme: contextData.theme || (circleWithCollections?.themes?.[0]) || {
			name: "Sample Theme",
			heading: "Sample Heading",
			description: "Sample theme description",
			status: "active",
		},
		presentation: {
			name: contextData.presentation?.name || "Sample Presentation",
			org: presentationOrgs,
			finalist_org: filterFinalistOrgs(
				presentationOrgs,
				contextData.values?.finalist_org_ids,
			),
			membership: circleWithCollections?.memberships ?? [],
		},
	}
}
