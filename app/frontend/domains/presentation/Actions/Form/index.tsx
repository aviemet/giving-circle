import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationActionFormData = {
	presentation_action: Schema.PresentationActionsFormData
}

export interface PresentationActionFormProps {
	to: string
	method?: HTTPVerb
	presentation_action: Schema.PresentationActionsFormData
}

export const PresentationActionForm = ({ to, method = "post", presentation_action }: PresentationActionFormProps) => {
	return (
		<Form<PresentationActionFormData>
			action={ to }
			initialData={ { presentation_action } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="presentation_action.slug" label="Slug" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.action_type" label="Action_type" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.config" label="Config" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.results" label="Results" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.trigger_type" label="Trigger_type" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_action.trigger_conditions" label="Trigger_conditions" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_action.id ? "Update" : "Create" } PresentationAction</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

