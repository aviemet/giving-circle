import clsx from "clsx"
import { type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { Accordion, Box, Button, Grid, Group, Stack, Text, UnstyledButton } from "@/components"
import { Checkbox, Select, TextInput } from "@/components/Inputs"

import {
	defaultField,
	type InteractionFieldConfig,
	type InteractionFieldType,
	referenceNameFromLabel,
} from "./FieldBuilder"
import * as classes from "./Form.css"
import { CURATED_INTERACTION_UI_SLUGS } from "./interactionConfig"
import {
	compatibleReducers,
	defaultOutputForField,
	rewriteOutputSourceFields,
	sanitizeOutputs,
	type InteractionOutputConfig,
} from "./OutputBuilder"

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

function LiveResultFields({
	output,
	fieldType,
	metrics,
	reducers,
	onChange,
}: {
	output: InteractionOutputConfig
	fieldType: InteractionFieldType | undefined
	metrics: string[]
	reducers: string[]
	onChange: (output: InteractionOutputConfig) => void
}) {
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

function AnswerWithResults({
	field,
	fieldIndex,
	outputs,
	fieldTypes,
	metrics,
	reducers,
	onFieldChange,
	onRemoveField,
	onOutputsChange,
}: {
	field: InteractionFieldConfig
	fieldIndex: number
	outputs: InteractionOutputConfig[]
	fieldTypes: string[]
	metrics: string[]
	reducers: string[]
	onFieldChange: (field: InteractionFieldConfig) => void
	onRemoveField: () => void
	onOutputsChange: (outputs: InteractionOutputConfig[]) => void
}) {
	const { t } = useTranslation()
	const linkedIndexes = outputs
		.map((output, index) => ({ output, index }))
		.filter(({ output }) => field.key.trim() !== "" && output.source_field === field.key)

	const handleAddResult = () => {
		onOutputsChange([...outputs, defaultOutputForField(field, reducers, metrics)])
	}

	return (
		<Box className={ clsx(classes.answerCard) }>
			<Box className={ clsx(classes.answerCardHeader) }>
				<Text fw={ 600 } size="sm">
					{ t("presentations.interactions.form.field_builder.answer_n", { index: fieldIndex + 1 }) }
				</Text>
				<Button variant="subtle" color="red" size="compact-sm" onClick={ onRemoveField }>
					{ t("presentations.interactions.form.field_builder.remove") }
				</Button>
			</Box>

			<Box className={ clsx(classes.answerCardBody) }>
				<AnswerCard
					field={ field }
					fieldTypes={ fieldTypes }
					onChange={ onFieldChange }
				/>
			</Box>

			<Box className={ clsx(classes.resultPanel) }>
				<Group justify="space-between" align="center" mb="sm">
					<Text className={ clsx(classes.resultPanelLabel) }>
						{ t("presentations.interactions.form.pipeline.live_result_badge") }
					</Text>
					{ linkedIndexes.length > 0 && (
						<Button variant="subtle" size="compact-sm" onClick={ handleAddResult }>
							{ t("presentations.interactions.form.pipeline.add_live_result") }
						</Button>
					) }
				</Group>

				{ linkedIndexes.length === 0
					? (
						<Button variant="light" size="compact-sm" onClick={ handleAddResult }>
							{ t("presentations.interactions.form.pipeline.add_live_result") }
						</Button>
					)
					: (
						<Stack gap="md">
							{ linkedIndexes.map(({ output, index }, resultIndex) => (
								<Box key={ `result-${fieldIndex}-${resultIndex}` }>
									<Group justify="flex-end" mb={ 4 }>
										<Button
											variant="subtle"
											color="red"
											size="compact-sm"
											onClick={ () => {
												onOutputsChange(outputs.filter((_, outputIndex) => outputIndex !== index))
											} }
										>
											{ t("presentations.interactions.form.output_builder.remove") }
										</Button>
									</Group>
									<LiveResultFields
										output={ output }
										fieldType={ field.type }
										metrics={ metrics }
										reducers={ reducers }
										onChange={ (nextOutput) => {
											const nextOutputs = [...outputs]
											nextOutputs[index] = {
												...nextOutput,
												source_field: field.key,
											}
											onOutputsChange(nextOutputs)
										} }
									/>
								</Box>
							)) }
						</Stack>
					) }
			</Box>
		</Box>
	)
}

export function OrphanResults({
	outputs,
	fields,
	metrics,
	reducers,
	onChange,
}: {
	outputs: InteractionOutputConfig[]
	fields: InteractionFieldConfig[]
	metrics: string[]
	reducers: string[]
	onChange: (outputs: InteractionOutputConfig[]) => void
}) {
	const { t } = useTranslation()
	const fieldKeys = new Set(fields.map((field) => field.key).filter((key) => key.trim() !== ""))
	const orphans = outputs
		.map((output, index) => ({ output, index }))
		.filter(({ output }) => output.source_field.trim() === "" || !fieldKeys.has(output.source_field))

	if(orphans.length === 0) return null

	return (
		<Box className={ clsx(classes.answerCard) }>
			<Box className={ clsx(classes.answerCardHeader) }>
				<Text fw={ 600 } size="sm">
					{ t("presentations.interactions.form.pipeline.unlinked_results") }
				</Text>
			</Box>
			<Box className={ clsx(classes.answerCardBody) }>
				<Text size="sm" c="dimmed" mb="sm">
					{ t("presentations.interactions.form.pipeline.unlinked_results_description") }
				</Text>
				<Stack gap="sm">
					{ orphans.map(({ output, index }) => (
						<Box key={ `orphan-${index}` }>
							<Button
								variant="subtle"
								color="red"
								size="compact-sm"
								mb="xs"
								onClick={ () => {
									onChange(outputs.filter((_, outputIndex) => outputIndex !== index))
								} }
							>
								{ t("presentations.interactions.form.output_builder.remove") }
							</Button>
							<LiveResultFields
								output={ output }
								fieldType={ fields.find((field) => field.key === output.source_field)?.type }
								metrics={ metrics }
								reducers={ reducers }
								onChange={ (nextOutput) => {
									const nextOutputs = [...outputs]
									nextOutputs[index] = nextOutput
									onChange(nextOutputs)
								} }
							/>
						</Box>
					)) }
				</Stack>
			</Box>
		</Box>
	)
}

function screenHintForSlug(slug: string, t: (key: string) => string): string {
	const key = `presentations.interactions.form.pipeline.screen_hints.${slug}`
	const translated = t(key)
	if(translated === key) {
		return t("presentations.interactions.form.pipeline.screen_hints.default")
	}
	return translated
}

export function InteractionTypePicker({
	uiTemplateId,
	uiTemplates,
	onChange,
	typeLocked = false,
}: {
	uiTemplateId: string
	uiTemplates: Array<{ id: string, name: string, slug: string }>
	onChange: (uiTemplateId: string) => void
	typeLocked?: boolean
}) {
	const { t } = useTranslation()
	const templates = typeLocked
		? uiTemplates.filter((template) => template.id === uiTemplateId)
		: uiTemplates
	const builtInTemplates = templates.filter((template) => CURATED_INTERACTION_UI_SLUGS.has(template.slug))
	const customTemplates = templates.filter((template) => !CURATED_INTERACTION_UI_SLUGS.has(template.slug))
	const listLabel = t("presentations.interactions.form.wizard.steps.type")

	return (
		<>
			{ builtInTemplates.length > 0 && (
				<Box mb="md">
					<Text className={ clsx(classes.typeGroupLabel) } mb="xs">
						{ t("presentations.interactions.form.wizard.type_groups.built_in") }
					</Text>
					<Box className={ clsx(classes.typeGrid) } role="listbox" aria-label={ listLabel }>
						{ builtInTemplates.map((template) => (
							<TypeTile
								key={ template.id }
								template={ template }
								selected={ template.id === uiTemplateId }
								typeLocked={ typeLocked }
								onChange={ onChange }
								t={ t }
							/>
						)) }
					</Box>
				</Box>
			) }

			{ customTemplates.length > 0 && (
				<Box>
					<Text className={ clsx(classes.typeGroupLabel) } mb="xs">
						{ t("presentations.interactions.form.wizard.type_groups.custom") }
					</Text>
					<Box className={ clsx(classes.typeGrid) } role="listbox" aria-label={ listLabel }>
						{ customTemplates.map((template) => (
							<TypeTile
								key={ template.id }
								template={ template }
								selected={ template.id === uiTemplateId }
								typeLocked={ typeLocked }
								onChange={ onChange }
								t={ t }
							/>
						)) }
					</Box>
				</Box>
			) }
		</>
	)
}

function TypeTile({
	template,
	selected,
	typeLocked,
	onChange,
	t,
}: {
	template: { id: string, name: string, slug: string }
	selected: boolean
	typeLocked: boolean
	onChange: (uiTemplateId: string) => void
	t: (key: string) => string
}) {
	return (
		<UnstyledButton
			type="button"
			role="option"
			aria-selected={ selected }
			disabled={ typeLocked }
			className={ clsx(classes.typeTile, selected && classes.typeTileSelected, typeLocked && classes.typeTileLocked) }
			onClick={ () => {
				if(typeLocked) return
				onChange(template.id)
			} }
		>
			<Text className={ clsx(classes.typeName) }>{ template.name }</Text>
			<Text className={ clsx(classes.typeHint) }>
				{ screenHintForSlug(template.slug, t) }
			</Text>
		</UnstyledButton>
	)
}

export function AnswerPipeline({
	fields,
	outputs,
	fieldTypes,
	metrics,
	reducers,
	onConfigChange,
	uiTemplateId,
	uiTemplates,
	onUiTemplateChange,
	showTypePicker = false,
	showAnswers = true,
	typeLocked = false,
	headerExtra,
}: {
	fields: InteractionFieldConfig[]
	outputs: InteractionOutputConfig[]
	fieldTypes: string[]
	metrics: string[]
	reducers: string[]
	onConfigChange: (next: {
		fields: InteractionFieldConfig[]
		outputs: InteractionOutputConfig[]
	}) => void
	uiTemplateId?: string
	uiTemplates?: Array<{ id: string, name: string, slug: string }>
	onUiTemplateChange?: (uiTemplateId: string) => void
	showTypePicker?: boolean
	showAnswers?: boolean
	typeLocked?: boolean
	headerExtra?: ReactNode
}) {
	const { t } = useTranslation()

	const updateFieldsAndOutputs = (
		nextFields: InteractionFieldConfig[],
		nextOutputs: InteractionOutputConfig[],
	) => {
		onConfigChange({
			fields: nextFields,
			outputs: sanitizeOutputs(nextOutputs, nextFields, reducers),
		})
	}

	const handleAddAnswer = () => {
		updateFieldsAndOutputs([...fields, defaultField()], outputs)
	}

	return (
		<Stack gap="md">
			{ headerExtra }

			{ showTypePicker && uiTemplateId !== undefined && uiTemplates !== undefined && onUiTemplateChange !== undefined && (
				<InteractionTypePicker
					uiTemplateId={ uiTemplateId }
					uiTemplates={ uiTemplates }
					onChange={ onUiTemplateChange }
					typeLocked={ typeLocked }
				/>
			) }

			{ showAnswers && (
				<>
					<Box className={ clsx(classes.answerList) }>
						{ fields.map((field, fieldIndex) => (
							<AnswerWithResults
								key={ fieldIndex }
								field={ field }
								fieldIndex={ fieldIndex }
								outputs={ outputs }
								fieldTypes={ fieldTypes }
								metrics={ metrics }
								reducers={ reducers }
								onFieldChange={ (nextField) => {
									const previousKey = field.key
									const nextFields = [...fields]
									nextFields[fieldIndex] = nextField
									const nextOutputs = rewriteOutputSourceFields(
										outputs,
										previousKey,
										nextField.key,
									)
									updateFieldsAndOutputs(nextFields, nextOutputs)
								} }
								onRemoveField={ () => {
									const removedKey = field.key
									const nextFields = fields.filter((_, index) => index !== fieldIndex)
									const nextOutputs = removedKey.trim() === ""
										? outputs
										: outputs.filter((output) => output.source_field !== removedKey)
									updateFieldsAndOutputs(nextFields, nextOutputs)
								} }
								onOutputsChange={ (nextOutputs) => {
									updateFieldsAndOutputs(fields, nextOutputs)
								} }
							/>
						)) }
					</Box>

					<Button variant="light" onClick={ handleAddAnswer }>
						{ t("presentations.interactions.form.pipeline.add_answer") }
					</Button>

					<OrphanResults
						outputs={ outputs }
						fields={ fields }
						metrics={ metrics }
						reducers={ reducers }
						onChange={ (nextOutputs) => {
							updateFieldsAndOutputs(fields, nextOutputs)
						} }
					/>
				</>
			) }

			{ !showAnswers && (
				<Text size="sm" c="dimmed">
					{ t("presentations.interactions.form.select_type_first") }
				</Text>
			) }
		</Stack>
	)
}
