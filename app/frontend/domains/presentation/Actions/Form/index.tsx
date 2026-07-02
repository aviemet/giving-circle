import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

interface PresentationActionRecord {
	id?: string
	slug?: string
	action_type?: string
	config?: string
	results?: string
	trigger_type?: string
	trigger_conditions?: string
}

type PresentationActionFormData = {
	presentation_action: PresentationActionRecord
}

export interface PresentationActionFormProps {
	to: string
	method?: HTTPVerb
	presentation_action: PresentationActionRecord
}

export const PresentationActionForm = ({ to, method = "post", presentation_action }: PresentationActionFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<PresentationActionFormData>
			action={ to }
			initialData={ { presentation_action } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="presentation_action.slug" label={ t("presentations.actions.form.slug") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.action_type" label={ t("presentations.actions.form.action_type") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.config" label={ t("presentations.actions.form.config") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.results" label={ t("presentations.actions.form.results") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.trigger_type" label={ t("presentations.actions.form.trigger_type") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.trigger_conditions" label={ t("presentations.actions.form.trigger_conditions") } />
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ presentation_action.id
							? t("presentations.actions.form.update")
							: t("presentations.actions.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
