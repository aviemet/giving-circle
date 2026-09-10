import clsx from "clsx"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"

import { Anchor, Divider, Grid, Stack, Text } from "@/components"
import { Form, Submit, useFormField, useFormFieldError } from "@/components/Form"
import { Checkbox, HiddenInput, NumberInput, Select, TextInput } from "@/components/Inputs"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { type HTTPVerb } from "@/lib/http"

import { AnswerPipeline, InteractionTypePicker } from "./AnswerPipeline"
import * as classes from "./Form.css"
import {
	applyInteractionConfigTemplate,
	clearInteractionConfigPipeline,
	configTemplateForUiTemplate,
	interactionConfigFrom,
	interactionTemplateOptions,
	isCuratedInteractionUiSlug,
	type InteractionConfig,
	type InteractionOrchestration,
	type InteractionSettings,
} from "./interactionConfig"
import { sanitizeOutputs } from "./OutputBuilder"

type PresentationInteractionFormData = {
	presentation_interaction: Schema.PresentationInteractionsFormData
	presentation: {
		settings: {
			finalist_count: number
		}
	}
}

export interface PresentationInteractionFormProps {
	to: string
	method?: HTTPVerb
	presentation_interaction: Schema.PresentationInteractionsFormData
}

function uiTemplateSlugForId(
	uiTemplateId: string,
	templates: Schema.InteractionUiTemplatesPersisted[],
) {
	return templates.find((template) => template.id === uiTemplateId)?.slug
}

function applyCuratedConfigForUiTemplate(
	current: InteractionConfig,
	uiTemplateId: string,
	interactionConfigTemplates: Schema.InteractionConfigTemplatesPersisted[],
	reducers: string[],
) {
	const matchingTemplate = configTemplateForUiTemplate(uiTemplateId, interactionConfigTemplates)
	if(!matchingTemplate) return current

	const next = applyInteractionConfigTemplate(current, matchingTemplate.id, interactionConfigTemplates)
	return {
		...next,
		outputs: sanitizeOutputs(next.outputs, next.fields, reducers),
	}
}

function FormSection({
	title,
	description,
	children,
}: {
	title: string
	description?: string
	children: ReactNode
}) {
	return (
		<section className={ clsx(classes.section) }>
			<Text className={ clsx(classes.sectionTitle) }>{ title }</Text>
			{ description !== undefined && description.length > 0 && (
				<Text className={ clsx(classes.sectionDescription) }>{ description }</Text>
			) }
			{ children }
		</section>
	)
}

export function PresentationInteractionForm({
	to,
	method = "post",
	presentation_interaction,
}: PresentationInteractionFormProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"editThemePresentationInteraction" | "newThemePresentationInteraction">()
	const {
		slides,
		field_types,
		metrics,
		reducers,
		interaction_config_templates,
		interaction_ui_templates,
	} = presentation_interaction
	const typeLocked = presentation_interaction.id !== undefined
	const [uiTemplateId, setUiTemplateId] = useState(
		() => presentation_interaction.interaction_ui_template?.id ?? "",
	)
	const [config, setConfig] = useState(() => {
		const initial = interactionConfigFrom(presentation_interaction.config)
		const initialUiTemplateId = presentation_interaction.interaction_ui_template?.id ?? ""
		if(initial.fields.length > 0 || initialUiTemplateId === "") return initial

		const slug = uiTemplateSlugForId(initialUiTemplateId, interaction_ui_templates)
		if(!isCuratedInteractionUiSlug(slug)) return initial

		return applyCuratedConfigForUiTemplate(
			initial,
			initialUiTemplateId,
			interaction_config_templates,
			reducers,
		)
	})
	const typeSelected = uiTemplateId !== ""
	const uiSlug = uiTemplateSlugForId(uiTemplateId, interaction_ui_templates)
	const custom = typeSelected && !isCuratedInteractionUiSlug(uiSlug)
	const hasSettings = uiSlug === "finalist_vote" || uiSlug === "pledges"

	const updateSetting = <Key extends keyof InteractionSettings>(
		key: Key,
		value: InteractionSettings[Key],
	) => {
		setConfig((current) => ({
			...current,
			settings: {
				...current.settings,
				[key]: value,
			},
		}))
	}

	const updateOrchestration = <Key extends keyof InteractionOrchestration>(
		key: Key,
		value: InteractionOrchestration[Key],
	) => {
		setConfig((current) => ({
			...current,
			orchestration: {
				...current.orchestration,
				[key]: value,
			},
		}))
	}

	const handleUiTemplateChange = (nextUiTemplateId: string) => {
		if(typeLocked) return

		setUiTemplateId(nextUiTemplateId)

		const nextSlug = uiTemplateSlugForId(nextUiTemplateId, interaction_ui_templates)
		if(isCuratedInteractionUiSlug(nextSlug)) {
			setConfig((current) => (
				applyCuratedConfigForUiTemplate(current, nextUiTemplateId, interaction_config_templates, reducers)
			))
		}
	}

	return (
		<Form<PresentationInteractionFormData>
			action={ to }
			method={ method }
			initialData={ {
				presentation_interaction,
				presentation: {
					settings: {
						finalist_count: presentation_interaction.finalist_count,
					},
				},
			} }
			transform={ (data) => {
				const interaction = data.presentation_interaction
				if(interaction === null || typeof interaction !== "object" || Array.isArray(interaction)) {
					return data
				}

				return {
					...data,
					presentation_interaction: {
						...interaction,
						interaction_ui_template_id: uiTemplateId,
						config: {
							fields: config.fields,
							outputs: sanitizeOutputs(config.outputs, config.fields, reducers).filter((output) => (
								output.source_field.trim() !== "" && output.reducer.trim() !== ""
							)),
							settings: config.settings,
							orchestration: config.orchestration,
						},
					},
				}
			} }
		>
			<HiddenInput name="presentation_interaction.interaction_ui_template_id" value={ uiTemplateId } />

			<Stack gap="xl">
				<ConfigError />

				<FormSection
					title={ t("presentations.interactions.form.wizard.steps.type") }
					description={ typeLocked
						? t("presentations.interactions.form.type_locked.description")
						: t("presentations.interactions.form.wizard.type_description") }
				>
					<InteractionTypePicker
						uiTemplateId={ uiTemplateId }
						uiTemplates={ interaction_ui_templates }
						onChange={ handleUiTemplateChange }
						typeLocked={ typeLocked }
					/>
				</FormSection>

				<Divider />

				<FormSection title={ t("presentations.interactions.form.wizard.steps.details") }>
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
								options={ [
									{ label: t("presentations.interactions.form.trigger_manual"), value: "manual" },
									{ label: t("presentations.interactions.form.trigger_slide"), value: "slide" },
								] }
								required
							/>
						</Grid.Col>
						<SlideTriggerField slides={ slides } />
					</Grid>
				</FormSection>

				{ typeSelected && hasSettings && (
					<>
						<Divider />
						<FormSection title={ t("presentations.interactions.form.wizard.steps.settings") }>
							<Grid>
								{ uiSlug === "finalist_vote" && (
									<>
										<Grid.Col span={ { base: 12, sm: 6 } }>
											<NumberInput
												name="presentation.settings.finalist_count"
												label={ t("presentations.interactions.form.settings.finalist_count") }
												min={ 1 }
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
							</Grid>
						</FormSection>
					</>
				) }

				{ typeSelected && (
					<>
						<Divider />
						<FormSection title={ t("presentations.interactions.form.orchestration.title") }>
							<Grid>
								<Grid.Col span={ { base: 12, sm: 4 } }>
									<NumberInput
										label={ t("presentations.interactions.form.orchestration.stage") }
										value={ config.orchestration?.stage }
										min={ 0 }
										onChange={ (value) => {
											const next = typeof value === "number" ? value : Number(value)
											if(Number.isFinite(next)) {
												updateOrchestration("stage", Math.round(next))
											}
										} }
									/>
								</Grid.Col>
								<Grid.Col span={ { base: 12, sm: 8 } }>
									<Select
										label={ t("presentations.interactions.form.orchestration.funding_basis") }
										options={ metrics.filter((metric) => {
											return metric === "pledge_totals" || metric === "allocated_totals"
										}).map((metric) => ({ label: metric, value: metric })) }
										value={ config.orchestration?.funding_basis?.[0] ?? null }
										onChange={ (value) => {
											updateOrchestration("funding_basis", value ? [value] : [])
										} }
										clearable
									/>
								</Grid.Col>
								<Grid.Col span={ 12 }>
									<Checkbox
										label={ t("presentations.interactions.form.orchestration.exclude_funded_orgs") }
										checked={ config.orchestration?.exclude_funded_orgs === true }
										onChange={ (event) => {
											updateOrchestration("exclude_funded_orgs", event.currentTarget.checked)
										} }
									/>
								</Grid.Col>
							</Grid>
						</FormSection>
					</>
				) }

				{ typeSelected && presentation_interaction.id !== undefined && (
					<>
						<Divider />
						<FormSection title={ t("presentations.interactions.form.member_answers") }>
							<Stack gap="xs">
								<Text className={ clsx(classes.sectionDescription) }>
									{ t("presentations.interactions.form.member_ui_summary") }
								</Text>
								<Anchor href={ Routes.editMemberUiThemePresentationInteraction(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
									params.slug,
								) }
								>
									{ t("presentations.interactions.form.member_ui_edit_link") }
								</Anchor>
							</Stack>
						</FormSection>
					</>
				) }

				{ typeSelected && (
					<>
						<Divider />
						<FormSection
							title={ t("presentations.interactions.form.wizard.steps.pipeline") }
							description={ custom
								? t("presentations.interactions.form.answer_pipeline.description")
								: t("presentations.interactions.form.wizard.pipeline_curated_intro") }
						>
							<AnswerPipeline
								fields={ config.fields }
								outputs={ config.outputs }
								fieldTypes={ field_types }
								metrics={ metrics }
								reducers={ reducers }
								onConfigChange={ ({ fields, outputs }) => {
									setConfig((current) => ({
										...current,
										fields,
										outputs: sanitizeOutputs(outputs, fields, reducers),
									}))
								} }
								headerExtra={ custom
									? (
										<Select
											label={ t("presentations.interactions.form.config_template_starter.label") }
											description={ t("presentations.interactions.form.config_template_starter.description") }
											placeholder={ t("presentations.interactions.form.template_blank") }
											options={ interactionTemplateOptions(interaction_config_templates) }
											onChange={ (value) => {
												if(!value) {
													setConfig((current) => clearInteractionConfigPipeline(current))
													return
												}
												setConfig((current) => (
													applyInteractionConfigTemplate(current, value, interaction_config_templates)
												))
											} }
											clearable
										/>
									)
									: undefined }
							/>
						</FormSection>
					</>
				) }

				{ !typeSelected && (
					<Text size="sm" c="dimmed">
						{ t("presentations.interactions.form.select_type_first") }
					</Text>
				) }

				<Submit>
					{ presentation_interaction.id
						? t("presentations.interactions.form.update")
						: t("presentations.interactions.form.create") }
				</Submit>
			</Stack>
		</Form>
	)
}

function SlideTriggerField({ slides }: { slides: Schema.SlidesPersisted[] }) {
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
