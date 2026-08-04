import { useTranslation } from "react-i18next"

import { Stack, Text } from "@/components"
import { Form, Submit, useFormField, useFormFieldContext } from "@/components/Form"
import { HiddenInput, PasswordInput, Select, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

export interface IntegrationFormProps {
	to: string
	method?: HTTPVerb
	integration: Schema.IntegrationsFormData
}

export function IntegrationForm({
	to,
	method = "post",
	integration,
}: IntegrationFormProps) {
	return (
		<Form<{ integration: Schema.IntegrationsFormData }>
			action={ to }
			method={ method }
			initialData={ { integration } }
		>
			<IntegrationFields
				isNew={ integration.id === undefined }
				providersByMedium={ integration.providers_by_medium }
				presets={ integration.presets }
			/>
		</Form>
	)
}

function IntegrationFields({
	isNew,
	providersByMedium,
	presets,
}: {
	isNew: boolean
	providersByMedium: Schema.IntegrationsFormData["providers_by_medium"]
	presets: Schema.IntegrationsFormData["presets"]
}) {
	const { t } = useTranslation()
	const { clearPathsStartingWith, setValue } = useFormFieldContext()
	const [providerValue] = useFormField("integration.provider")
	const provider = typeof providerValue === "string" && providerValue.length > 0
		? providerValue
		: "smtp"

	const selectedPreset = presets[provider]
	const medium = selectedPreset?.medium ?? "email"
	const fields = selectedPreset?.fields ?? []
	const authProfile = selectedPreset?.auth_profile

	const providerOptions = Object.entries(providersByMedium).flatMap(([providerMedium, providers]) =>
		providers.map((providerOption) => ({
			label: `${t(`integrations.form.providers.${providerOption}`)} (${t(`integrations.form.mediums.${providerMedium}`)})`,
			value: providerOption,
		})),
	)

	return (
		<Stack gap="lg">
			<TextInput name="integration.name" label={ t("integrations.form.name") } required />

			<Select
				name="integration.provider"
				label={ t("integrations.form.provider") }
				options={ providerOptions }
				onChange={ (value) => {
					if(typeof value !== "string") return

					clearPathsStartingWith("integration.credentials")
					const nextPreset = presets[value]
					if(nextPreset !== undefined) {
						setValue("integration.medium", nextPreset.medium)
					}
				} }
				required
			/>

			{ authProfile !== undefined && (
				<Text size="sm" c="dimmed">
					{ t("integrations.form.auth_profile_hint", {
						profile: t(`integrations.form.auth_profiles.${authProfile}`),
					}) }
				</Text>
			) }

			<HiddenInput name="integration.medium" value={ medium } />
			<HiddenInput name="integration.active" value="true" />

			{ fields.map((field) => {
				const inputName = `integration.credentials.${field.key}`
				const label = t(`integrations.form.credential_fields.${field.key}`)

				if(field.secret) {
					return (
						<PasswordInput
							key={ `${provider}-${field.key}` }
							name={ inputName }
							label={ label }
							required={ isNew }
						/>
					)
				}

				return (
					<TextInput
						key={ `${provider}-${field.key}` }
						name={ inputName }
						label={ label }
						required
					/>
				)
			}) }

			<Submit>
				{ isNew ? t("integrations.form.create") : t("integrations.form.update") }
			</Submit>
		</Stack>
	)
}
