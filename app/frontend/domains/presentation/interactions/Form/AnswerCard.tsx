import { useTranslation } from "react-i18next"

import { Accordion, Grid, Stack, Text } from "@/components"
import { Checkbox, Select, TextInput } from "@/components/Inputs"

import {
	type InteractionFieldConfig,
	type InteractionFieldType,
	referenceNameFromLabel,
} from "./FieldBuilder"

const INTERACTION_FIELD_TYPES: ReadonlyArray<InteractionFieldType> = [
	"text",
	"number",
	"money",
	"boolean",
	"single_select",
	"multi_select",
	"org_reference",
	"org_money_map",
	"org_ranked_list",
	"field_group",
]

function isInteractionFieldType(value: string | null): value is InteractionFieldType {
	if(value === null) return false
	return INTERACTION_FIELD_TYPES.some((type) => type === value)
}

function defaultNestedField(): InteractionFieldConfig {
	return {
		key: "",
		type: "text",
		label: "",
		options: {},
	}
}

interface AnswerCardProps {
	field: InteractionFieldConfig
	fieldTypes: string[]
	onChange: (field: InteractionFieldConfig) => void
}

export function AnswerCard({ field, fieldTypes, onChange }: AnswerCardProps) {
	const { t } = useTranslation()

	const typeOptions = fieldTypes.map((type) => {
		const translationKey = `presentations.interactions.form.types.${type}`
		const translated = t(translationKey)
		return {
			label: translated === translationKey ? type.replaceAll("_", " ") : translated,
			value: type,
		}
	})

	return (
		<Stack gap="sm">
			<Grid>
				<Grid.Col span={ 12 }>
					<TextInput
						label={ t("presentations.interactions.form.field_builder.label") }
						description={ t("presentations.interactions.form.field_builder.label_description") }
						value={ field.label }
						onChange={ (event) => {
							const nextLabel = event.currentTarget.value
							const previousSlug = referenceNameFromLabel(field.label)
							const shouldAutoFill = field.key === "" || field.key === previousSlug
							onChange({
								...field,
								label: nextLabel,
								key: shouldAutoFill ? referenceNameFromLabel(nextLabel) : field.key,
							})
						} }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<Select
						label={ t("presentations.interactions.form.field_builder.type") }
						description={ t("presentations.interactions.form.field_builder.type_description") }
						value={ field.type }
						onChange={ (value) => {
							if(!isInteractionFieldType(value)) return

							onChange({
								...field,
								type: value,
								options: {},
								fields: value === "field_group" ? [defaultNestedField()] : undefined,
							})
						} }
						options={ typeOptions }
						required
					/>
				</Grid.Col>
			</Grid>
			<Accordion variant="separated" radius="sm">
				<Accordion.Item value="advanced">
					<Accordion.Control>
						<Text size="sm">
							{ t("presentations.interactions.form.pipeline.advanced") }
						</Text>
					</Accordion.Control>
					<Accordion.Panel>
						<TextInput
							label={ t("presentations.interactions.form.field_builder.key") }
							description={ t("presentations.interactions.form.field_builder.key_description") }
							value={ field.key }
							onChange={ (event) => {
								onChange({ ...field, key: event.currentTarget.value })
							} }
							required
						/>
					</Accordion.Panel>
				</Accordion.Item>
			</Accordion>
			<AnswerOptionsPanel
				field={ field }
				fieldTypes={ fieldTypes }
				onChange={ onChange }
			/>
		</Stack>
	)
}

function AnswerOptionsPanel({
	field,
	fieldTypes,
	onChange,
}: AnswerCardProps) {
	const { t } = useTranslation()
	const options = field.options ?? {}

	if(field.type === "single_select" || field.type === "multi_select") {
		return (
			<TextInput
				label={ t("presentations.interactions.form.field_builder.choices") }
				description={ t("presentations.interactions.form.field_builder.choices_description") }
				value={ (options.choices ?? []).join(", ") }
				onChange={ (event) => {
					const choices = event.currentTarget.value
						.split(",")
						.map((choice) => choice.trim())
						.filter(Boolean)

					onChange({
						...field,
						options: { ...options, choices },
					})
				} }
			/>
		)
	}

	if(field.type === "number") {
		return (
			<Grid>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<TextInput
						label={ t("presentations.interactions.form.field_builder.min") }
						description={ t("presentations.interactions.form.field_builder.min_description") }
						type="number"
						value={ options.min?.toString() ?? "" }
						onChange={ (event) => {
							const min = event.currentTarget.value === "" ? undefined : Number(event.currentTarget.value)
							onChange({ ...field, options: { ...options, min } })
						} }
					/>
				</Grid.Col>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<TextInput
						label={ t("presentations.interactions.form.field_builder.max") }
						description={ t("presentations.interactions.form.field_builder.max_description") }
						type="number"
						value={ options.max?.toString() ?? "" }
						onChange={ (event) => {
							const max = event.currentTarget.value === "" ? undefined : Number(event.currentTarget.value)
							onChange({ ...field, options: { ...options, max } })
						} }
					/>
				</Grid.Col>
			</Grid>
		)
	}

	if(field.type === "field_group") {
		const nestedFields = field.fields ?? []
		const nestedTypes = fieldTypes.filter((type) => type !== "field_group")

		return (
			<Stack gap="sm">
				<Checkbox
					label={ t("presentations.interactions.form.field_builder.repeatable") }
					checked={ options.repeatable ?? false }
					onChange={ (event) => {
						onChange({
							...field,
							options: { ...options, repeatable: event.currentTarget.checked },
						})
					} }
				/>
				<Grid>
					<Grid.Col span={ { base: 12, sm: 6 } }>
						<TextInput
							label={ t("presentations.interactions.form.field_builder.min_entries") }
							description={ t("presentations.interactions.form.field_builder.min_entries_description") }
							type="number"
							value={ options.min?.toString() ?? "" }
							onChange={ (event) => {
								const min = event.currentTarget.value === "" ? undefined : Number(event.currentTarget.value)
								onChange({ ...field, options: { ...options, min } })
							} }
						/>
					</Grid.Col>
					<Grid.Col span={ { base: 12, sm: 6 } }>
						<TextInput
							label={ t("presentations.interactions.form.field_builder.max_entries") }
							description={ t("presentations.interactions.form.field_builder.max_entries_description") }
							type="number"
							value={ options.max?.toString() ?? "" }
							onChange={ (event) => {
								const max = event.currentTarget.value === "" ? undefined : Number(event.currentTarget.value)
								onChange({ ...field, options: { ...options, max } })
							} }
						/>
					</Grid.Col>
				</Grid>
				<Text size="sm" fw={ 500 }>
					{ t("presentations.interactions.form.field_builder.nested_fields") }
				</Text>
				{ nestedFields.map((nestedField, nestedIndex) => (
					<AnswerCard
						key={ nestedIndex }
						field={ nestedField }
						fieldTypes={ nestedTypes }
						onChange={ (nextNested) => {
							const nextFields = [...nestedFields]
							nextFields[nestedIndex] = nextNested
							onChange({ ...field, fields: nextFields })
						} }
					/>
				)) }
			</Stack>
		)
	}

	return null
}
