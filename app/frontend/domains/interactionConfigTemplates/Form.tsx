import clsx from "clsx"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Box, Grid, Text } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

import * as classes from "../presentation/interactions/Form/flowLane.css"
import { interactionConfigFrom, type InteractionConfig } from "../presentation/interactions/Form/interactionConfig"
import { InteractionConfigPipeline } from "../presentation/interactions/Form/InteractionConfigPipeline"
import { sanitizeOutputs } from "../presentation/interactions/Form/OutputBuilder"

type InteractionConfigTemplateFormInput = {
	id?: string
	name: string
	config: unknown
	field_types?: string[]
	metrics?: string[]
	reducers?: string[]
	interaction_ui_template?: { id: string, name: string, slug: string }
	interaction_ui_templates?: Array<{ id: string, name: string, slug: string }>
}

type InteractionConfigTemplateFormData = {
	interaction_config_template: {
		id?: string
		name: string
		interaction_ui_template_id?: string
	}
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value)
}

function isInteractionConfigTemplateSubmitRecord(
	value: unknown,
): value is InteractionConfigTemplateFormData["interaction_config_template"] {
	if(!isPlainObject(value)) return false

	return typeof value.name === "string"
}

export interface InteractionConfigTemplateFormProps {
	to: string
	method?: HTTPVerb
	interaction_config_template: InteractionConfigTemplateFormInput
}

export function InteractionConfigTemplateForm({
	to,
	method = "post",
	interaction_config_template,
}: InteractionConfigTemplateFormProps) {
	const { t } = useTranslation()
	const fieldTypes = interaction_config_template.field_types ?? []
	const metrics = interaction_config_template.metrics ?? []
	const reducers = interaction_config_template.reducers ?? []
	const uiTemplates = interaction_config_template.interaction_ui_templates ?? []
	const initialConfig = useMemo(
		() => interactionConfigFrom(interaction_config_template.config),
		[interaction_config_template.config],
	)
	const [config, setConfig] = useState(initialConfig)
	const [uiTemplateId, setUiTemplateId] = useState(
		() => interaction_config_template.interaction_ui_template?.id ?? "",
	)

	const updateConfig = (nextConfig: InteractionConfig) => {
		setConfig({
			...nextConfig,
			outputs: sanitizeOutputs(nextConfig.outputs, nextConfig.fields, reducers),
		})
	}

	return (
		<Form<InteractionConfigTemplateFormData>
			action={ to }
			method={ method }
			initialData={ {
				interaction_config_template: {
					id: interaction_config_template.id,
					name: interaction_config_template.name,
					interaction_ui_template_id: uiTemplateId,
				},
			} }
			transform={ (data) => {
				const template = data.interaction_config_template
				if(!isInteractionConfigTemplateSubmitRecord(template)) return data

				return {
					interaction_config_template: {
						name: template.name,
						interaction_ui_template_id: uiTemplateId,
						config,
					},
				}
			} }
		>
			<input
				type="hidden"
				name="interaction_config_template.interaction_ui_template_id"
				value={ uiTemplateId }
			/>
			<Grid>
				<Grid.Col span={ 12 }>
					<Box className={ clsx(classes.leadStrip) }>
						<Text size="sm">
							{ t("interaction_config_templates.form.intro") }
						</Text>
					</Box>
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<TextInput
						name="interaction_config_template.name"
						label={ t("interaction_config_templates.form.name") }
						description={ t("interaction_config_templates.form.name_description") }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<InteractionConfigPipeline
						fields={ config.fields }
						outputs={ config.outputs }
						fieldTypes={ fieldTypes }
						metrics={ metrics }
						reducers={ reducers }
						uiTemplateId={ uiTemplateId }
						uiTemplates={ uiTemplates }
						onUiTemplateChange={ setUiTemplateId }
						onConfigChange={ ({ fields, outputs }) => {
							updateConfig({ ...config, fields, outputs })
						} }
					/>
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ interaction_config_template.id
							? t("interaction_config_templates.form.update")
							: t("interaction_config_templates.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
