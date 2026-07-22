import { useTranslation } from "react-i18next"

import { Grid, Stack, Text } from "@/components"
import { Form, Submit } from "@/components/Form"
import { HiddenInput, Select } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

import { type InteractionConfig } from "../interactions/Form/interactionConfig"
import { ResponseFields, interactionFormContextFrom, responseDataFrom } from "../interactions/Form/ResponseFields"

type ResponseFormInput = {
	id?: string
	membership_id: string
	memberships?: Schema.MembershipsPersisted[]
	presentation_interaction_id?: string
	response_data?: unknown
	context?: unknown
}

type PresentationInteractionResponseFormData = {
	presentation_interaction_response: ResponseFormInput
}

export interface PresentationInteractionResponseFormProps {
	to: string
	method?: HTTPVerb
	presentation_interaction_response: ResponseFormInput
	interaction_config: InteractionConfig
}

export function PresentationInteractionResponseForm({
	to,
	method = "post",
	presentation_interaction_response,
	interaction_config,
}: PresentationInteractionResponseFormProps) {
	const { t } = useTranslation()
	const memberships = presentation_interaction_response.memberships ?? []
	const context = interactionFormContextFrom(presentation_interaction_response.context)
	const responseData = responseDataFrom(presentation_interaction_response.response_data)

	return (
		<Form<PresentationInteractionResponseFormData>
			action={ to }
			initialData={ { presentation_interaction_response } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					{ presentation_interaction_response.id
						? (
							<HiddenInput
								name="presentation_interaction_response.membership_id"
								value={ presentation_interaction_response.membership_id }
							/>
						)
						: (
							<Select
								name="presentation_interaction_response.membership_id"
								label={ t("presentations.interaction_responses.form.member") }
								options={ memberships.map((membership) => ({
									label: membership.name,
									value: membership.id,
								})) }
								required
							/>
						) }
				</Grid.Col>
				<Grid.Col span={ 12 }>
					<Stack gap="md">
						<Text size="sm" fw={ 500 }>
							{ t("presentations.interaction_responses.form.response") }
						</Text>
						<ResponseFields
							fields={ interaction_config.fields }
							namePrefix="presentation_interaction_response.response_data"
							responseData={ responseData }
							context={ context }
						/>
					</Stack>
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ presentation_interaction_response.id
							? t("presentations.interaction_responses.form.update")
							: t("presentations.interaction_responses.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
