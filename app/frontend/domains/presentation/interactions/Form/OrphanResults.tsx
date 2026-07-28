import clsx from "clsx"
import { useTranslation } from "react-i18next"

import { Box, Button, Stack, Text } from "@/components"

import { type InteractionFieldConfig } from "./FieldBuilder"
import { FlowSurface } from "./FlowSurface"
import * as classes from "./flowLane.css"
import { type InteractionOutputConfig } from "./OutputBuilder"
import { ResultCard } from "./ResultCard"

interface OrphanResultsProps {
	outputs: InteractionOutputConfig[]
	fields: InteractionFieldConfig[]
	metrics: string[]
	reducers: string[]
	onChange: (outputs: InteractionOutputConfig[]) => void
}

export function OrphanResults({
	outputs,
	fields,
	metrics,
	reducers,
	onChange,
}: OrphanResultsProps) {
	const { t } = useTranslation()
	const fieldKeys = new Set(fields.map((field) => field.key).filter((key) => key.trim() !== ""))
	const orphans = outputs
		.map((output, index) => ({ output, index }))
		.filter(({ output }) => output.source_field.trim() === "" || !fieldKeys.has(output.source_field))

	if(orphans.length === 0) return null

	return (
		<Box className={ clsx(classes.orphanBlock) }>
			<FlowSurface title={ t("presentations.interactions.form.pipeline.unlinked_results") }>
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
							<ResultCard
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
			</FlowSurface>
		</Box>
	)
}
