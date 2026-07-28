import { toSnakeCase } from "@/lib/strings"

export type InteractionFieldType =
	| "text"
	| "number"
	| "money"
	| "boolean"
	| "single_select"
	| "multi_select"
	| "org_reference"
	| "org_money_map"
	| "org_ranked_list"
	| "field_group"

export type InteractionFieldOptions = {
	choices?: string[]
	min?: number
	max?: number
	repeatable?: boolean
}

export type InteractionFieldConfig = {
	key: string
	type: InteractionFieldType
	label: string
	options?: InteractionFieldOptions
	fields?: InteractionFieldConfig[]
}

export function referenceNameFromLabel(label: string): string {
	return toSnakeCase(label)
}

export function defaultField(): InteractionFieldConfig {
	return {
		key: "",
		type: "text",
		label: "",
		options: {},
	}
}
