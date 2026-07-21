import { useTranslation } from "react-i18next"

import { Grid, Stack } from "@/components"
import { NumberInput, Select, TextInput } from "@/components/Inputs"

import { type InteractionFieldConfig } from "./FieldBuilder"

export type InteractionFormContext = {
	presentation_orgs?: Schema.OrgsPersisted[]
	choices?: Record<string, string[]>
}

export type MoneyValue = {
	amount_cents: number
	currency?: string
}

export type OrgMoneyMapEntry = {
	org_id: string
	amount_cents: number
}

export type OrgRankEntry = {
	org_id: string
	rank: number
}

export type ResponseFieldValue =
	| string
	| number
	| string[]
	| MoneyValue
	| OrgMoneyMapEntry[]
	| OrgRankEntry[]
	| FieldGroupEntry[]
	| undefined

export type ResponseData = Record<string, ResponseFieldValue>

export type FieldGroupEntry = Record<string, ResponseFieldValue>

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isFieldGroupEntry(value: unknown): value is FieldGroupEntry {
	if(!isRecord(value)) return false
	return Object.values(value).every(isResponseFieldValue)
}

function isMoneyValue(value: unknown): value is MoneyValue {
	return isRecord(value) && typeof value.amount_cents === "number" && !("org_id" in value)
}

function isOrgMoneyMapEntry(value: unknown): value is OrgMoneyMapEntry {
	return isRecord(value) && typeof value.org_id === "string" && typeof value.amount_cents === "number" && !("rank" in value)
}

function isOrgRankEntry(value: unknown): value is OrgRankEntry {
	return isRecord(value) && typeof value.org_id === "string" && typeof value.rank === "number" && !("amount_cents" in value)
}

function isResponseFieldValue(value: unknown): value is ResponseFieldValue {
	if(value === undefined) return true
	if(typeof value === "string" || typeof value === "number") return true
	if(Array.isArray(value)) {
		if(value.every((item) => typeof item === "string")) return true
		if(value.every(isOrgMoneyMapEntry)) return true
		if(value.every(isOrgRankEntry)) return true
		if(value.every(isFieldGroupEntry)) return true
		return false
	}
	if(isMoneyValue(value)) return true
	return false
}

export function isResponseData(value: unknown): value is ResponseData {
	if(!isRecord(value)) return false
	return Object.values(value).every(isResponseFieldValue)
}

export function responseDataFrom(value: unknown): ResponseData {
	if(isResponseData(value)) return value
	return {}
}

function fieldGroupEntries(value: ResponseFieldValue): FieldGroupEntry[] {
	if(!Array.isArray(value)) return [{}]

	const entries = value.filter(isFieldGroupEntry)
	return entries.length > 0 ? entries : [{}]
}

export function interactionFormContextFrom(value: unknown): InteractionFormContext {
	if(!isRecord(value)) return {}

	const choices = value.choices
	let parsedChoices: Record<string, string[]> | undefined
	if(isRecord(choices)) {
		parsedChoices = {}
		for(const [key, choiceValue] of Object.entries(choices)) {
			if(Array.isArray(choiceValue) && choiceValue.every((entry) => typeof entry === "string")) {
				parsedChoices[key] = choiceValue
			}
		}
	}

	return {
		presentation_orgs: Array.isArray(value.presentation_orgs) ? value.presentation_orgs : undefined,
		choices: parsedChoices,
	}
}

type ResponseFieldProps = {
	field: InteractionFieldConfig
	namePrefix: string
	value: ResponseFieldValue
	context: InteractionFormContext
}

function orgOptions(context: InteractionFormContext) {
	return context.presentation_orgs ?? []
}

function orgMoneyMapValue(value: ResponseFieldValue, orgId: string): number | undefined {
	if(!Array.isArray(value)) return undefined

	const entry = value.find((row) => {
		if(typeof row !== "object" || row === null || Array.isArray(row)) return false
		return (row as OrgMoneyMapEntry).org_id === orgId
	})

	if(!entry || typeof entry !== "object" || Array.isArray(entry)) return undefined
	return (entry as OrgMoneyMapEntry).amount_cents
}

function orgRankValue(value: ResponseFieldValue, orgId: string): number | undefined {
	if(!Array.isArray(value)) return undefined

	const entry = value.find((row) => {
		if(typeof row !== "object" || row === null || Array.isArray(row)) return false
		return (row as OrgRankEntry).org_id === orgId
	})

	if(!entry || typeof entry !== "object" || Array.isArray(entry)) return undefined
	return (entry as OrgRankEntry).rank
}

function moneyAmountCents(value: ResponseFieldValue): number | undefined {
	if(typeof value !== "object" || value === null || Array.isArray(value)) return undefined
	if(!("amount_cents" in value)) return undefined

	const amountCents = value.amount_cents
	return typeof amountCents === "number" ? amountCents : undefined
}

export function ResponseField({ field, namePrefix, value, context }: ResponseFieldProps) {
	const { t } = useTranslation()
	const options = field.options ?? {}
	const choices = options.choices ?? context.choices?.[field.key] ?? []

	switch(field.type) {
		case "text":
			return (
				<TextInput
					name={ `${namePrefix}.${field.key}` }
					label={ field.label }
					defaultValue={ typeof value === "string" ? value : "" }
					required
				/>
			)
		case "number":
			return (
				<NumberInput
					name={ `${namePrefix}.${field.key}` }
					label={ field.label }
					defaultValue={ typeof value === "number" ? value : undefined }
					min={ options.min }
					max={ options.max }
					hideControls
					required
				/>
			)
		case "money":
			return (
				<Stack gap="xs">
					<NumberInput
						name={ `${namePrefix}.${field.key}.amount_cents` }
						label={ t("presentations.interaction_responses.form.amount_cents", { label: field.label }) }
						defaultValue={ moneyAmountCents(value) }
						hideControls
						required
					/>
					<TextInput
						name={ `${namePrefix}.${field.key}.currency` }
						label={ t("presentations.interaction_responses.form.currency") }
						defaultValue={
							typeof value === "object" && value !== null && !Array.isArray(value) && "currency" in value && typeof value.currency === "string"
								? value.currency
								: "USD"
						}
					/>
				</Stack>
			)
		case "single_select":
			return (
				<Select
					name={ `${namePrefix}.${field.key}` }
					label={ field.label }
					defaultValue={ typeof value === "string" ? value : undefined }
					options={ choices.map((choice) => ({ label: choice, value: choice })) }
					required
				/>
			)
		case "org_reference": {
			const orgs = orgOptions(context)
			return (
				<Select
					name={ `${namePrefix}.${field.key}` }
					label={ field.label }
					defaultValue={ typeof value === "string" ? value : undefined }
					options={ orgs.map((org) => ({ label: org.name, value: org.id })) }
					required
				/>
			)
		}
		case "org_money_map": {
			const orgs = orgOptions(context)
			return (
				<Stack gap="sm">
					{ orgs.map((org, index) => (
						<NumberInput
							key={ org.id }
							name={ `${namePrefix}.${field.key}[${index}].amount_cents` }
							label={ `${org.name} (cents)` }
							defaultValue={ orgMoneyMapValue(value, org.id) }
							hideControls
						/>
					)) }
					{ orgs.map((org, index) => (
						<input
							key={ `${org.id}-id` }
							type="hidden"
							name={ `${namePrefix}.${field.key}[${index}].org_id` }
							value={ org.id }
						/>
					)) }
				</Stack>
			)
		}
		case "org_ranked_list": {
			const orgs = orgOptions(context)
			return (
				<Stack gap="sm">
					{ orgs.map((org, index) => (
						<NumberInput
							key={ org.id }
							name={ `${namePrefix}.${field.key}[${index}].rank` }
							label={ `${org.name} rank` }
							defaultValue={ orgRankValue(value, org.id) }
							hideControls
						/>
					)) }
					{ orgs.map((org, index) => (
						<input
							key={ `${org.id}-rank-id` }
							type="hidden"
							name={ `${namePrefix}.${field.key}[${index}].org_id` }
							value={ org.id }
						/>
					)) }
				</Stack>
			)
		}
		case "field_group": {
			const entries = fieldGroupEntries(value)
			const groupCount = Math.max(entries.length, options.min ?? 1)

			return (
				<Stack gap="md">
					{ Array.from({ length: groupCount }).map((_, groupIndex) => (
						<Stack key={ groupIndex } gap="sm">
							{ (field.fields ?? []).map((nestedField) => {
								const groupValue = entries[groupIndex] ?? {}
								const nestedValue = groupValue[nestedField.key]

								return (
									<ResponseField
										key={ `${nestedField.key}-${groupIndex}` }
										field={ nestedField }
										namePrefix={ `${namePrefix}.${field.key}[${groupIndex}]` }
										value={ nestedValue }
										context={ context }
									/>
								)
							}) }
						</Stack>
					)) }
				</Stack>
			)
		}
		default:
			return null
	}
}

type ResponseFieldsProps = {
	fields: InteractionFieldConfig[]
	namePrefix: string
	responseData: ResponseData
	context: InteractionFormContext
}

export function ResponseFields({ fields, namePrefix, responseData, context }: ResponseFieldsProps) {
	return (
		<Grid>
			{ fields.map((field) => (
				<Grid.Col key={ field.key } span={ 12 }>
					<ResponseField
						field={ field }
						namePrefix={ namePrefix }
						value={ responseData[field.key] }
						context={ context }
					/>
				</Grid.Col>
			)) }
		</Grid>
	)
}
