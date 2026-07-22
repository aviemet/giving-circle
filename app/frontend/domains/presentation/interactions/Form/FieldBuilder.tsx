import { useTranslation } from "react-i18next"

import { Button, Grid, Group, Stack, Text } from "@/components"
import { Checkbox, Select, TextInput } from "@/components/Inputs"

export type InteractionFieldType =
	| "text"
	| "number"
	| "money"
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

type FieldBuilderProps = {
	fields: InteractionFieldConfig[]
	fieldTypes: string[]
	onChange: (fields: InteractionFieldConfig[]) => void
}

type FieldOptionsPanelProps = {
	field: InteractionFieldConfig
	fieldTypes: string[]
	onChange: (field: InteractionFieldConfig) => void
}

function defaultField(): InteractionFieldConfig {
	return {
		key: "",
		type: "text",
		label: "",
		options: {},
	}
}

function FieldOptionsPanel({ field, fieldTypes, onChange }: FieldOptionsPanelProps) {
	const { t } = useTranslation()
	const options = field.options ?? {}

	if(field.type === "single_select" || field.type === "multi_select") {
		return (
			<TextInput
				label={ t("presentations.interactions.form.field_builder.choices") }
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
				<FieldBuilder
					fields={ field.fields ?? [] }
					fieldTypes={ fieldTypes.filter((type) => type !== "field_group") }
					onChange={ (nestedFields) => {
						onChange({ ...field, fields: nestedFields })
					} }
				/>
			</Stack>
		)
	}

	return null
}

function FieldBuilderRow({
	field,
	index,
	fieldTypes,
	onChange,
	onRemove,
}: {
	field: InteractionFieldConfig
	index: number
	fieldTypes: string[]
	onChange: (field: InteractionFieldConfig) => void
	onRemove: () => void
}) {
	const { t } = useTranslation()

	return (
		<Stack gap="sm" p="md" style={ { border: "1px solid var(--mantine-color-default-border)", borderRadius: 8 } }>
			<Group justify="space-between">
				<Text size="sm" fw={ 500 }>
					{ t("presentations.interactions.form.field_builder.field_n", { index: index + 1 }) }
				</Text>
				<Button variant="subtle" color="red" size="compact-sm" onClick={ onRemove }>
					{ t("presentations.interactions.form.field_builder.remove") }
				</Button>
			</Group>
			<Grid>
				<Grid.Col span={ 12 }>
					<TextInput
						label={ t("presentations.interactions.form.field_builder.label") }
						value={ field.label }
						onChange={ (event) => {
							onChange({ ...field, label: event.currentTarget.value })
						} }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<TextInput
						label={ t("presentations.interactions.form.field_builder.key") }
						value={ field.key }
						onChange={ (event) => {
							onChange({ ...field, key: event.currentTarget.value })
						} }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ { base: 12, sm: 6 } }>
					<Select
						label={ t("presentations.interactions.form.field_builder.type") }
						value={ field.type }
						onChange={ (value) => {
							onChange({
								...field,
								type: value as InteractionFieldType,
								options: {},
								fields: value === "field_group" ? [defaultField()] : undefined,
							})
						} }
						options={ fieldTypes.map((type) => ({ label: type.replaceAll("_", " "), value: type })) }
						required
					/>
				</Grid.Col>
			</Grid>
			<FieldOptionsPanel
				field={ field }
				fieldTypes={ fieldTypes }
				onChange={ onChange }
			/>
		</Stack>
	)
}

export function FieldBuilder({ fields, fieldTypes, onChange }: FieldBuilderProps) {
	const { t } = useTranslation()

	return (
		<Stack gap="md">
			{ fields.map((field, index) => (
				<FieldBuilderRow
					key={ index }
					field={ field }
					index={ index }
					fieldTypes={ fieldTypes }
					onChange={ (nextField) => {
						const nextFields = [...fields]
						nextFields[index] = nextField
						onChange(nextFields)
					} }
					onRemove={ () => {
						onChange(fields.filter((_, fieldIndex) => fieldIndex !== index))
					} }
				/>
			)) }
			<Button
				variant="light"
				onClick={ () => {
					onChange([...fields, defaultField()])
				} }
			>
				{ t("presentations.interactions.form.field_builder.add_field") }
			</Button>
		</Stack>
	)
}
