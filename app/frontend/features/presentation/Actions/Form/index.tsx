import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

type PresentationActionFormData = {
	presentation_action: Schema.PresentationActionsFormData
}

export interface PresentationActionFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationActionFormData>) => boolean|void
	presentation_action: Schema.PresentationActionsFormData
}

const PresentationActionForm = ({ method = "post", presentation_action, ...props }: PresentationActionFormProps) => {
	return (
		<Form
			model="presentation_action"
			data={ { presentation_action } }
			method={ method }
			{ ...props }
		>
			<Grid>
			
				<Grid.Col>
					<TextInput name="slug" label="Slug" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="action_type" label="Action_type" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="config" label="Config" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="results" label="Results" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="trigger_type" label="Trigger_type" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="trigger_conditions" label="Trigger_conditions" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_action.id ? 'Update' : 'Create' } PresentationAction</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationActionForm
