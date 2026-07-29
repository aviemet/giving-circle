import { useTranslation } from "react-i18next"

import { Grid, Text } from "@/components"
import { Select } from "@/components/Inputs"

import { type InteractionFieldType } from "./FieldBuilder"
import { compatibleReducers, type InteractionOutputConfig } from "./OutputBuilder"

function translatedOptionLabel(
	t: (key: string) => string,
	prefix: string,
	value: string,
): string {
	const translationKey = `${prefix}.${value}`
	const translated = t(translationKey)
	if(translated === translationKey) {
		return value.replaceAll("_", " ")
	}
	return translated
}

interface ResultCardProps {
	output: InteractionOutputConfig
	fieldType: InteractionFieldType | undefined
	metrics: string[]
	reducers: string[]
	onChange: (output: InteractionOutputConfig) => void
}

export function ResultCard({
	output,
	fieldType,
	metrics,
	reducers,
	onChange,
}: ResultCardProps) {
	const { t } = useTranslation()
	const availableReducers = fieldType
		? compatibleReducers(fieldType, reducers)
		: reducers
	const reducerValue = availableReducers.includes(output.reducer)
		? output.reducer
		: (availableReducers[0] ?? "")

	return (
		<Grid>
			<Grid.Col span={ { base: 12, sm: 6 } }>
				<Select
					label={ t("presentations.interactions.form.output_builder.metric") }
					description={ t("presentations.interactions.form.output_builder.metric_description") }
					value={ output.metric }
					onChange={ (value) => {
						onChange({ ...output, metric: value ?? "" })
					} }
					options={ metrics.map((metric) => ({
						label: translatedOptionLabel(t, "presentations.interactions.form.metrics", metric),
						value: metric,
					})) }
				/>
			</Grid.Col>
			<Grid.Col span={ { base: 12, sm: 6 } }>
				{ availableReducers.length > 0
					? (
						<Select
							label={ t("presentations.interactions.form.output_builder.reducer") }
							description={ t("presentations.interactions.form.output_builder.reducer_description") }
							value={ reducerValue }
							onChange={ (value) => {
								onChange({ ...output, reducer: value ?? "" })
							} }
							options={ availableReducers.map((reducer) => ({
								label: translatedOptionLabel(t, "presentations.interactions.form.reducers", reducer),
								value: reducer,
							})) }
						/>
					)
					: (
						<Text size="sm" c="dimmed">
							{ fieldType
								? t("presentations.interactions.form.output_builder.no_compatible_reducers")
								: t("presentations.interactions.form.output_builder.select_source_first") }
						</Text>
					) }
			</Grid.Col>
		</Grid>
	)
}
