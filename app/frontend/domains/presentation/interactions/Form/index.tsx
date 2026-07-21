import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Grid, Stack, Text } from "@/components"
import { Form, Submit, useFormField, useFormFieldError } from "@/components/Form"
import { Select, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

import { FieldBuilder } from "./FieldBuilder"
import {
	interactionConfigFrom,
	interactionConfigFromTemplate,
	interactionTemplateOptions,
	type InteractionConfig,
} from "./interactionConfig"
import { OutputBuilder, sanitizeOutputs } from "./OutputBuilder"

type PresentationInteractionFormData = {
	presentation_interaction: Schema.PresentationInteractionsFormData
}

export interface PresentationInteractionFormProps {
	to: string
	method?: HTTPVerb
	presentation_interaction: Schema.PresentationInteractionsFormData
}

export function PresentationInteractionForm({
	to,
	method = "post",
	presentation_interaction,
}: PresentationInteractionFormProps) {
	const { t } = useTranslation()
	const { slides, field_types, metrics, reducers, interaction_config_templates } = presentation_interaction
	const [config, setConfig] = useState(() => interactionConfigFrom(presentation_interaction.config))

	const triggerTypeOptions = [
		{ label: t("presentations.interactions.form.trigger_manual"), value: "manual" },
		{ label: t("presentations.interactions.form.trigger_slide"), value: "slide" },
	]

	const updateConfig = (nextConfig: InteractionConfig) => {
		setConfig({
			...nextConfig,
			outputs: sanitizeOutputs(nextConfig.outputs, nextConfig.fields, reducers),
		})
	}

	return (
		<Form<PresentationInteractionFormData>
			action={ to }
			method={ method }
			initialData={ { presentation_interaction } }
			transform={ (data) => {
				const interaction = data.presentation_interaction
				if(interaction === null || typeof interaction !== "object" || Array.isArray(interaction)) {
					return data
				}

				return {
					presentation_interaction: {
						...interaction,
						config: {
							fields: config.fields,
							outputs: sanitizeOutputs(config.outputs, config.fields, reducers).filter((output) => (
								output.source_field.trim() !== "" && output.reducer.trim() !== ""
							)),
						},
					},
				}
			} }
		>
			<Grid>
				<Grid.Col span={ { base: 12, sm: 8 } }>
					<TextInput
						name="presentation_interaction.name"
						label={ t("presentations.interactions.form.name") }
						required
					/>
				</Grid.Col>

				<Grid.Col span={ { base: 12, sm: 4 } }>
					<Select
						name="presentation_interaction.trigger_type"
						label={ t("presentations.interactions.form.trigger_type") }
						options={ triggerTypeOptions }
						required
					/>
				</Grid.Col>

				<SlideTriggerFields slides={ slides } />

				<Grid.Col span={ { base: 12, sm: 6 } }>
					<Select
						label={ t("presentations.interactions.form.template") }
						options={ interactionTemplateOptions(interaction_config_templates) }
						onChange={ (value) => {
							if(!value) {
								updateConfig({ fields: [], outputs: [] })
								return
							}
							updateConfig(interactionConfigFromTemplate(value, interaction_config_templates))
						} }
					/>
				</Grid.Col>

				<Grid.Col span={ 12 }>
					<Stack gap="md">
						<Text size="sm" fw={ 500 }>{ t("presentations.interactions.form.data_points") }</Text>
						<ConfigError />
						<FieldBuilder
							fields={ config.fields }
							fieldTypes={ field_types }
							onChange={ (fields) => {
								updateConfig({ ...config, fields })
							} }
						/>
					</Stack>
				</Grid.Col>

				<Grid.Col span={ 12 }>
					<Stack gap="md">
						<Text size="sm" fw={ 500 }>{ t("presentations.interactions.form.outputs") }</Text>
						<OutputBuilder
							outputs={ config.outputs }
							fields={ config.fields }
							metrics={ metrics }
							reducers={ reducers }
							onChange={ (outputs) => {
								updateConfig({ ...config, outputs })
							} }
						/>
					</Stack>
				</Grid.Col>

				<Grid.Col>
					<Submit>
						{ presentation_interaction.id
							? t("presentations.interactions.form.update")
							: t("presentations.interactions.form.create") }
					</Submit>
				</Grid.Col>

			</Grid>
		</Form>
	)
}

function SlideTriggerFields({ slides }: { slides: Schema.SlidesPersisted[] }) {
	const { t } = useTranslation()
	const [triggerType] = useFormField("presentation_interaction.trigger_type")
	if(triggerType !== "slide") return null

	return (
		<Grid.Col span={ { base: 12, sm: 6 } }>
			<Select
				name="presentation_interaction.trigger_conditions.slide_slug"
				label={ t("presentations.interactions.form.slide") }
				options={ slides.map((slide) => ({
					label: slide.title ?? slide.slug,
					value: slide.slug,
				})) }
				required
			/>
		</Grid.Col>
	)
}

function ConfigError() {
	const configError = useFormFieldError("presentation_interaction.config")
	if(!configError) return null

	return <Text size="sm" c="red">{ configError }</Text>
}
