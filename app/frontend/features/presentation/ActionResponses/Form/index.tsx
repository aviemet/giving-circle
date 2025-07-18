import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

type PresentationActionResponseFormData = {
	presentation_action_response: Schema.PresentationActionResponsesFormData
}

export interface PresentationActionResponseFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationActionResponseFormData>) => boolean|void
	presentation_action_response: Schema.PresentationActionResponsesFormData
}

const PresentationActionResponseForm = ({ method = "post", presentation_action_response, ...props }: PresentationActionResponseFormProps) => {
	return (
		<Form
			model="presentation_action_response"
			data={ { presentation_action_response } }
			method={ method }
			{ ...props }
		>
			<Grid>
			
				<Grid.Col>
					<TextInput name="response_data" label="Response_data" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_action_response.id ? 'Update' : 'Create' } PresentationActionResponse</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationActionResponseForm
