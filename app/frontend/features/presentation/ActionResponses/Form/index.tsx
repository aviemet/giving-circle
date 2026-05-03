import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationActionResponseFormData = {
	presentation_action_response: Schema.PresentationActionResponsesFormData
}

export interface PresentationActionResponseFormProps {
	to: string
	method?: HTTPVerb
	presentation_action_response: Schema.PresentationActionResponsesFormData
}

const PresentationActionResponseForm = ({ to, method = "post", presentation_action_response }: PresentationActionResponseFormProps) => {
	return (
		<Form
			action={ to }
			initialData={ { presentation_action_response } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="presentation_action_response.response_data" label="Response_data" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_action_response.id ? "Update" : "Create" } PresentationActionResponse</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export { PresentationActionResponseForm }
