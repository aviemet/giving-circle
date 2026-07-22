import { useTranslation } from "react-i18next"

import { Button, Grid, Group, Stack, Text } from "@/components"
import { Select } from "@/components/Inputs"

import { type InteractionFieldConfig, type InteractionFieldType } from "./FieldBuilder"

export type InteractionOutputConfig = {
	metric: string
	source_field: string
	reducer: string
}

const REDUCER_FIELD_TYPES: Record<string, InteractionFieldType[]> = {
	sum_by_org: ["org_money_map"],
	count_by_value: ["org_reference", "single_select"],
	sum_money: ["money"],
	rank_aggregate: ["org_ranked_list"],
}

export function compatibleReducers(fieldType: InteractionFieldType, reducers: string[]): string[] {
	return reducers.filter((reducer) => REDUCER_FIELD_TYPES[reducer]?.includes(fieldType))
}

export function outputSourceFields(fields: InteractionFieldConfig[]): InteractionFieldConfig[] {
	const sources: InteractionFieldConfig[] = []

	fields.forEach((field) => {
		if(field.type === "field_group") {
			if(field.fields) {
				sources.push(...outputSourceFields(field.fields))
			}
			return
		}

		if(field.key.trim() !== "") {
			sources.push(field)
		}
	})

	return sources
}

function sourceFieldOptionLabel(field: InteractionFieldConfig): string {
	const label = field.label.trim()
	const key = field.key.trim()

	if(label) return `${label} (${key})`
	return key
}

export function sanitizeOutput(
	output: InteractionOutputConfig,
	sourceFields: InteractionFieldConfig[],
	reducers: string[],
): InteractionOutputConfig {
	const field = sourceFields.find((entry) => entry.key === output.source_field)
	if(!field) {
		return { ...output, reducer: "" }
	}

	const availableReducers = compatibleReducers(field.type, reducers)
	if(!availableReducers.includes(output.reducer)) {
		return { ...output, reducer: availableReducers[0] ?? "" }
	}

	return output
}

export function sanitizeOutputs(
	outputs: InteractionOutputConfig[],
	fields: InteractionFieldConfig[],
	reducers: string[],
): InteractionOutputConfig[] {
	const sourceFields = outputSourceFields(fields)
	return outputs.map((output) => sanitizeOutput(output, sourceFields, reducers))
}

function defaultOutput(
	sourceFields: InteractionFieldConfig[],
	reducers: string[],
): InteractionOutputConfig {
	const firstField = sourceFields[0]
	if(!firstField) {
		return {
			metric: "allocated_totals",
			source_field: "",
			reducer: "",
		}
	}

	const availableReducers = compatibleReducers(firstField.type, reducers)

	return {
		metric: "allocated_totals",
		source_field: firstField.key,
		reducer: availableReducers[0] ?? "",
	}
}

type OutputBuilderProps = {
	outputs: InteractionOutputConfig[]
	fields: InteractionFieldConfig[]
	metrics: string[]
	reducers: string[]
	onChange: (outputs: InteractionOutputConfig[]) => void
}

export function OutputBuilder({ outputs, fields, metrics, reducers, onChange }: OutputBuilderProps) {
	const { t } = useTranslation()
	const sourceFields = outputSourceFields(fields)

	return (
		<Stack gap="md">
			{ outputs.map((output, index) => {
				const selectedField = sourceFields.find((field) => field.key === output.source_field)
				const availableReducers = selectedField
					? compatibleReducers(selectedField.type, reducers)
					: reducers
				const reducerValue = availableReducers.includes(output.reducer)
					? output.reducer
					: (availableReducers[0] ?? "")

				return (
					<Stack
						key={ `output-${index}` }
						gap="sm"
						p="md"
						style={ { border: "1px solid var(--mantine-color-default-border)", borderRadius: 8 } }
					>
						<Group justify="space-between">
							<Text size="sm" fw={ 500 }>
								{ t("presentations.interactions.form.output_builder.output_n", { index: index + 1 }) }
							</Text>
							<Button
								variant="subtle"
								color="red"
								size="compact-sm"
								onClick={ () => {
									onChange(outputs.filter((_, outputIndex) => outputIndex !== index))
								} }
							>
								{ t("presentations.interactions.form.output_builder.remove") }
							</Button>
						</Group>
						<Grid>
							<Grid.Col>
								<Select
									label={ t("presentations.interactions.form.output_builder.metric") }
									value={ output.metric }
									onChange={ (value) => {
										const nextOutputs = [...outputs]
										nextOutputs[index] = { ...output, metric: value ?? "" }
										onChange(nextOutputs)
									} }
									options={ metrics.map((metric) => ({
										label: metric.replaceAll("_", " "),
										value: metric,
									})) }
								/>
							</Grid.Col>
							<Grid.Col>
								<Select
									label={ t("presentations.interactions.form.output_builder.source_field") }
									value={ output.source_field }
									onChange={ (value) => {
										const field = sourceFields.find((entry) => entry.key === value)
										const nextReducer = field
											? (compatibleReducers(field.type, reducers)[0] ?? "")
											: ""

										const nextOutputs = [...outputs]
										nextOutputs[index] = {
											...output,
											source_field: value ?? "",
											reducer: nextReducer,
										}
										onChange(nextOutputs)
									} }
									options={ sourceFields.map((field) => ({
										label: sourceFieldOptionLabel(field),
										value: field.key,
									})) }
									placeholder={ t("presentations.interactions.form.output_builder.select_field") }
								/>
							</Grid.Col>
							<Grid.Col>
								{ availableReducers.length > 0
									? (
										<Select
											label={ t("presentations.interactions.form.output_builder.reducer") }
											value={ reducerValue }
											onChange={ (value) => {
												const nextOutputs = [...outputs]
												nextOutputs[index] = { ...output, reducer: value ?? "" }
												onChange(nextOutputs)
											} }
											options={ availableReducers.map((reducer) => ({
												label: reducer.replaceAll("_", " "),
												value: reducer,
											})) }
										/>
									)
									: (
										<Text size="sm" c="dimmed">
											{ selectedField
												? t("presentations.interactions.form.output_builder.no_compatible_reducers")
												: t("presentations.interactions.form.output_builder.select_source_first") }
										</Text>
									) }
							</Grid.Col>
						</Grid>
					</Stack>
				)
			}) }
			<Button
				variant="light"
				onClick={ () => {
					onChange([...outputs, defaultOutput(sourceFields, reducers)])
				} }
			>
				{ t("presentations.interactions.form.output_builder.add_output") }
			</Button>
		</Stack>
	)
}
