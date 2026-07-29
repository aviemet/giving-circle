import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, Button, Group, Stack, Text } from "@/components"

import { AnswerCard } from "./AnswerCard"
import { type InteractionFieldConfig } from "./FieldBuilder"
import * as classes from "./flowLane.css"
import {
	defaultOutputForField,
	type InteractionOutputConfig,
} from "./OutputBuilder"
import { ResultCard } from "./ResultCard"

interface AnswerResultPairProps {
	field: InteractionFieldConfig
	fieldIndex: number
	outputs: InteractionOutputConfig[]
	fieldTypes: string[]
	metrics: string[]
	reducers: string[]
	onFieldChange: (field: InteractionFieldConfig) => void
	onRemoveField: () => void
	onOutputsChange: (outputs: InteractionOutputConfig[]) => void
}

export function AnswerResultPair({
	field,
	fieldIndex,
	outputs,
	fieldTypes,
	metrics,
	reducers,
	onFieldChange,
	onRemoveField,
	onOutputsChange,
}: AnswerResultPairProps) {
	const { t } = useTranslation()
	const linkedIndexes = outputs
		.map((output, index) => ({ output, index }))
		.filter(({ output }) => field.key.trim() !== "" && output.source_field === field.key)

	const handleAddResult = () => {
		onOutputsChange([...outputs, defaultOutputForField(field, reducers, metrics)])
	}

	return (
		<Box className={ clsx(classes.answerUnit) }>
			<Box className={ clsx(classes.answerHeader) }>
				<Text className={ clsx(classes.surfaceTitle) }>
					{ t("presentations.interactions.form.field_builder.answer_n", { index: fieldIndex + 1 }) }
				</Text>
				<Button variant="subtle" color="red" size="compact-sm" onClick={ onRemoveField }>
					{ t("presentations.interactions.form.field_builder.remove") }
				</Button>
			</Box>

			<Box className={ clsx(classes.answerBody) }>
				<AnswerCard
					field={ field }
					fieldTypes={ fieldTypes }
					onChange={ onFieldChange }
				/>
			</Box>

			<Box
				className={ clsx(
					classes.resultDock,
					linkedIndexes.length > 0 && classes.resultDockFilled,
				) }
			>
				<Group justify="space-between" align="center" mb={ 4 }>
					<Text className={ clsx(classes.resultDockLabel) }>
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
						<Box className={ clsx(classes.resultDockEmpty) }>
							<Button variant="light" size="compact-sm" onClick={ handleAddResult }>
								{ t("presentations.interactions.form.pipeline.add_live_result") }
							</Button>
						</Box>
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
									<ResultCard
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
