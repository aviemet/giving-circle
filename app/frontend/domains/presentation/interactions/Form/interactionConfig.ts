import { i18n } from "@/lib/i18n"

import { type InteractionFieldConfig } from "./FieldBuilder"
import { type InteractionOutputConfig } from "./OutputBuilder"

export type InteractionSettings = {
	default_votes?: number
	allow_non_finalists?: boolean
	allow_over_ask?: boolean
}

export type InteractionOrchestration = {
	stage?: number
	output_metric?: string
	funding_basis?: string[]
	exclude_funded_orgs?: boolean
}

export type InteractionConfig = {
	fields: InteractionFieldConfig[]
	outputs: InteractionOutputConfig[]
	settings: InteractionSettings
	orchestration?: InteractionOrchestration
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
	if(isInteractionConfig(value)) {
		return {
			fields: value.fields,
			outputs: value.outputs,
			settings: isRecord(value.settings) ? interactionSettingsFrom(value.settings) : {},
			orchestration: isRecord(value.orchestration) ? interactionOrchestrationFrom(value.orchestration) : {},
		}
	}
	return { fields: [], outputs: [], settings: {}, orchestration: {} }
}

function interactionSettingsFrom(value: Record<string, unknown>): InteractionSettings {
	const settings: InteractionSettings = {}
	if(typeof value.default_votes === "number") {
		settings.default_votes = value.default_votes
	}
	if(typeof value.allow_non_finalists === "boolean") {
		settings.allow_non_finalists = value.allow_non_finalists
	}
	if(typeof value.allow_over_ask === "boolean") {
		settings.allow_over_ask = value.allow_over_ask
	}
	return settings
}

function interactionOrchestrationFrom(value: Record<string, unknown>): InteractionOrchestration {
	const orchestration: InteractionOrchestration = {}
	if(typeof value.stage === "number") {
		orchestration.stage = value.stage
	}
	if(typeof value.output_metric === "string") {
		orchestration.output_metric = value.output_metric
	}
	if(Array.isArray(value.funding_basis)) {
		orchestration.funding_basis = value.funding_basis.filter((metric): metric is string => typeof metric === "string")
	}
	if(typeof value.exclude_funded_orgs === "boolean") {
		orchestration.exclude_funded_orgs = value.exclude_funded_orgs
	}
	return orchestration
}

export const BLANK_INTERACTION_CONFIG: InteractionConfig = {
	fields: [],
	outputs: [],
	settings: {},
	orchestration: {},
}

export const CURATED_INTERACTION_UI_SLUGS = new Set(["allocation", "finalist_vote", "pledges"])

export function isCuratedInteractionUiSlug(slug: string | undefined): slug is "allocation" | "finalist_vote" | "pledges" {
	return slug !== undefined && CURATED_INTERACTION_UI_SLUGS.has(slug)
}

type InteractionConfigTemplateWithUi = InteractionConfigTemplateOption & {
	interaction_ui_template?: { id: string }
}

export function configTemplateForUiTemplate(
	uiTemplateId: string,
	templates: InteractionConfigTemplateWithUi[],
) {
	return templates.find((template) => template.interaction_ui_template?.id === uiTemplateId)
}

type InteractionConfigTemplateOption = {
	id: string
	name: string
	slug?: string
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

export function applyInteractionConfigTemplate(
	current: InteractionConfig,
	templateId: string,
	templates: InteractionConfigTemplateOption[],
): InteractionConfig {
	const fromTemplate = interactionConfigFromTemplate(templateId, templates)

	return {
		fields: fromTemplate.fields,
		outputs: fromTemplate.outputs,
		settings: current.settings,
		orchestration: current.orchestration ?? fromTemplate.orchestration ?? {},
	}
}

export function clearInteractionConfigPipeline(current: InteractionConfig): InteractionConfig {
	return {
		...current,
		fields: [],
		outputs: [],
	}
}
