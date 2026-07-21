import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Grid, Stack, Text } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

import { FieldBuilder } from "../presentation/interactions/Form/FieldBuilder"
import { interactionConfigFrom, type InteractionConfig } from "../presentation/interactions/Form/interactionConfig"
import { OutputBuilder, sanitizeOutputs } from "../presentation/interactions/Form/OutputBuilder"

type InteractionConfigTemplateFormInput = {
	id?: string
	name: string
	config: unknown
	field_types?: string[]
	metrics?: string[]
	reducers?: string[]
}

type InteractionConfigTemplateFormData = {
	interaction_config_template: {
		id?: string
		name: string
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
	const initialConfig = useMemo(
		() => interactionConfigFrom(interaction_config_template.config),
		[interaction_config_template.config],
	)
	const [config, setConfig] = useState(initialConfig)

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
				},
			} }
			transform={ (data) => {
				const template = data.interaction_config_template
				if(!isInteractionConfigTemplateSubmitRecord(template)) return data

				return {
					interaction_config_template: {
						name: template.name,
						config,
					},
				}
			} }
		>
			<Grid>
				<Grid.Col span={ 12 }>
					<TextInput
						name="interaction_config_template.name"
						label={ t("interaction_config_templates.form.name") }
						required
					/>
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<Stack gap="md">
						<Text size="sm" fw={ 500 }>{ t("interaction_config_templates.form.data_points") }</Text>
						<FieldBuilder
							fields={ config.fields }
							fieldTypes={ fieldTypes }
							onChange={ (fields) => {
								updateConfig({ ...config, fields })
							} }
						/>
					</Stack>
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<Stack gap="md">
						<Text size="sm" fw={ 500 }>{ t("interaction_config_templates.form.outputs") }</Text>
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
						{ interaction_config_template.id
							? t("interaction_config_templates.form.update")
							: t("interaction_config_templates.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
