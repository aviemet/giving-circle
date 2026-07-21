import { i18n } from "@/lib/i18n"

import { type InteractionFieldConfig } from "./FieldBuilder"
import { type InteractionOutputConfig } from "./OutputBuilder"

export type InteractionConfig = {
	fields: InteractionFieldConfig[]
	outputs: InteractionOutputConfig[]
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isInteractionFieldConfig(value: unknown): value is InteractionFieldConfig {
	if(!isRecord(value)) return false
	if(typeof value.key !== "string") return false
	if(typeof value.type !== "string") return false
	if(typeof value.label !== "string") return false
	return true
}

export function isInteractionConfig(value: unknown): value is InteractionConfig {
	if(!isRecord(value)) return false
	if(!Array.isArray(value.fields) || !Array.isArray(value.outputs)) return false
	return value.fields.every(isInteractionFieldConfig)
}

export function interactionConfigFrom(value: unknown): InteractionConfig {
	if(isInteractionConfig(value)) return value
	return { fields: [], outputs: [] }
}

export const BLANK_INTERACTION_CONFIG: InteractionConfig = {
	fields: [],
	outputs: [],
}

type InteractionConfigTemplateOption = {
	id: string
	name: string
	config: unknown
}

export function interactionTemplateOptions(templates: Array<Pick<InteractionConfigTemplateOption, "id" | "name">>) {
	return [
		{ label: i18n.t("presentations.interactions.form.template_blank"), value: "" },
		...templates.map((template) => ({
			label: template.name,
			value: template.id,
		})),
	]
}

export function interactionConfigFromTemplate(
	templateId: string,
	templates: InteractionConfigTemplateOption[],
): InteractionConfig {
	const template = templates.find((entry) => entry.id === templateId)
	if(!template) return structuredClone(BLANK_INTERACTION_CONFIG)

	return structuredClone(interactionConfigFrom(template.config))
}
