import clsx from "clsx"
import { type ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { Box, Button, Stack, Text } from "@/components"

import { AnswerResultPair } from "./AnswerResultPair"
import { defaultField, type InteractionFieldConfig } from "./FieldBuilder"
import { FlowConnector } from "./FlowConnector"
import * as classes from "./flowLane.css"
import { FlowStep } from "./FlowStep"
import { MemberFormStep } from "./MemberFormStep"
import { OrphanResults } from "./OrphanResults"
import {
	rewriteOutputSourceFields,
	sanitizeOutputs,
	type InteractionOutputConfig,
} from "./OutputBuilder"

interface InteractionConfigPipelineProps {
	fields: InteractionFieldConfig[]
	outputs: InteractionOutputConfig[]
	fieldTypes: string[]
	metrics: string[]
	reducers: string[]
	uiTemplateId: string
	uiTemplates: Array<{ id: string, name: string, slug: string }>
	onConfigChange: (next: {
		fields: InteractionFieldConfig[]
		outputs: InteractionOutputConfig[]
	}) => void
	onUiTemplateChange: (uiTemplateId: string) => void
	uiTemplateRequired?: boolean
	showAnswerPipeline?: boolean
	headerExtra?: ReactNode
}

export function InteractionConfigPipeline({
	fields,
	outputs,
	fieldTypes,
	metrics,
	reducers,
	uiTemplateId,
	uiTemplates,
	onConfigChange,
	onUiTemplateChange,
	uiTemplateRequired = false,
	showAnswerPipeline = true,
	headerExtra,
}: InteractionConfigPipelineProps) {
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
			<Box>
				<Text className={ clsx(classes.flowEyebrow) }>
					{ t("presentations.interactions.form.pipeline.flow") }
				</Text>
				<Text size="sm" c="dimmed" mt={ 4 }>
					{ t("presentations.interactions.form.pipeline.flow_description") }
				</Text>
			</Box>

			{ headerExtra }

			<Box className={ clsx(classes.lane) }>
				<Box className={ clsx(classes.spine) } aria-hidden />

				<FlowStep marker="1">
					<MemberFormStep
						uiTemplateId={ uiTemplateId }
						uiTemplates={ uiTemplates }
						onChange={ onUiTemplateChange }
						required={ uiTemplateRequired }
					/>
				</FlowStep>

				{ showAnswerPipeline && (
					<>
						<FlowConnector label={ t("presentations.interactions.form.pipeline.collects_answers") } />

						{ fields.map((field, fieldIndex) => (
							<FlowStep key={ fieldIndex } marker={ String(fieldIndex + 2) }>
								<AnswerResultPair
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
							</FlowStep>
						)) }

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
			</Box>
		</Stack>
	)
}
