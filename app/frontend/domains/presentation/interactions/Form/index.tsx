import { useState } from "react"
import { useTranslation } from "react-i18next"

import { Grid, Text } from "@/components"
import { Form, Submit, useFormField, useFormFieldError } from "@/components/Form"
import { Checkbox, NumberInput, Select, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

import {
	interactionConfigFrom,
	interactionConfigFromTemplate,
	interactionTemplateOptions,
	type InteractionConfig,
	type InteractionSettings,
} from "./interactionConfig"
import { InteractionConfigPipeline } from "./InteractionConfigPipeline"
import { sanitizeOutputs } from "./OutputBuilder"

type PresentationInteractionFormData = {
	presentation_interaction: Schema.PresentationInteractionsFormData
}

export interface PresentationInteractionFormProps {
	to: string
	method?: HTTPVerb
	presentation_interaction: Schema.PresentationInteractionsFormData
}

const CURATED_UI_SLUGS = new Set(["allocation", "finalist_vote", "pledges"])

function uiTemplateSlugForId(
	uiTemplateId: string,
	templates: Schema.InteractionUiTemplatesPersisted[],
) {
	return templates.find((template) => template.id === uiTemplateId)?.slug
}

export function PresentationInteractionForm({
	to,
	method = "post",
	presentation_interaction,
}: PresentationInteractionFormProps) {
	const { t } = useTranslation()
	const {
		slides,
		field_types,
		metrics,
		reducers,
		interaction_config_templates,
		interaction_ui_templates,
	} = presentation_interaction
	const [config, setConfig] = useState(() => interactionConfigFrom(presentation_interaction.config))
	const [uiTemplateId, setUiTemplateId] = useState(
		() => presentation_interaction.interaction_ui_template?.id ?? "",
	)
	const uiSlug = uiTemplateSlugForId(uiTemplateId, interaction_ui_templates)
	const curated = uiSlug !== undefined && CURATED_UI_SLUGS.has(uiSlug)

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

	const updateSetting = <Key extends keyof InteractionSettings>(
		key: Key,
		value: InteractionSettings[Key],
	) => {
		setConfig({
			...config,
			settings: {
				...config.settings,
				[key]: value,
			},
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
						interaction_ui_template_id: uiTemplateId,
						config: {
							fields: config.fields,
							outputs: sanitizeOutputs(config.outputs, config.fields, reducers).filter((output) => (
								output.source_field.trim() !== "" && output.reducer.trim() !== ""
							)),
							settings: config.settings,
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
								updateConfig({ fields: [], outputs: [], settings: {} })
								return
							}
							const template = interaction_config_templates.find((entry) => entry.id === value)
							updateConfig(interactionConfigFromTemplate(value, interaction_config_templates))
							if(template?.interaction_ui_template?.id) {
								setUiTemplateId(template.interaction_ui_template.id)
							}
						} }
					/>
				</Grid.Col>

				<input type="hidden" name="presentation_interaction.interaction_ui_template_id" value={ uiTemplateId } />

				{ uiSlug === "finalist_vote" && (
					<>
						<Grid.Col span={ { base: 12, sm: 6 } }>
							<NumberInput
								label={ t("presentations.interactions.form.settings.finalist_count") }
								value={ typeof config.settings.finalist_count === "number"
									? config.settings.finalist_count
									: Number(config.settings.finalist_count) || undefined }
								min={ 1 }
								onChange={ (value) => {
									const next = typeof value === "number" ? value : Number(value)
									if(Number.isFinite(next)) {
										updateSetting("finalist_count", Math.round(next))
									}
								} }
							/>
						</Grid.Col>
						<Grid.Col span={ { base: 12, sm: 6 } }>
							<NumberInput
								label={ t("presentations.interactions.form.settings.default_votes") }
								value={ typeof config.settings.default_votes === "number"
									? config.settings.default_votes
									: Number(config.settings.default_votes) || undefined }
								min={ 0 }
								onChange={ (value) => {
									const next = typeof value === "number" ? value : Number(value)
									if(Number.isFinite(next)) {
										updateSetting("default_votes", Math.round(next))
									}
								} }
							/>
						</Grid.Col>
					</>
				) }

				{ uiSlug === "pledges" && (
					<>
						<Grid.Col span={ { base: 12, sm: 6 } }>
							<Checkbox
								label={ t("presentations.interactions.form.settings.allow_non_finalists") }
								checked={ config.settings.allow_non_finalists === true }
								onChange={ (event) => {
									updateSetting("allow_non_finalists", event.currentTarget.checked)
								} }
							/>
						</Grid.Col>
						<Grid.Col span={ { base: 12, sm: 6 } }>
							<Checkbox
								label={ t("presentations.interactions.form.settings.allow_over_ask") }
								checked={ config.settings.allow_over_ask === true }
								onChange={ (event) => {
									updateSetting("allow_over_ask", event.currentTarget.checked)
								} }
							/>
						</Grid.Col>
					</>
				) }

				<Grid.Col span={ 12 }>
					<InteractionConfigPipeline
						fields={ config.fields }
						outputs={ config.outputs }
						fieldTypes={ field_types }
						metrics={ metrics }
						reducers={ reducers }
						uiTemplateId={ uiTemplateId }
						uiTemplates={ interaction_ui_templates }
						onUiTemplateChange={ setUiTemplateId }
						uiTemplateRequired
						showAnswerPipeline={ !curated }
						headerExtra={ <ConfigError /> }
						onConfigChange={ ({ fields, outputs }) => {
							updateConfig({ ...config, fields, outputs })
						} }
					/>
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
