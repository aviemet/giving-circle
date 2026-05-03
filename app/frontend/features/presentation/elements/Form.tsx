import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationElementFormData = {
	presentation_element: Schema.PresentationElementsFormData
}

export interface PresentationElementFormProps {
	to: string
	method?: HTTPVerb
	presentation_element: Schema.PresentationElementsFormData
}

const PresentationElementForm = ({ to, method = "post", presentation_element }: PresentationElementFormProps) => {
	return (
		<Form
			action={ to }
			initialData={ { presentation_element } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="presentation_element.data" label="Data" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_element.name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="presentation_element.template" label="Template" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_element.id ? "Update" : "Create" } PresentationElement</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export { PresentationElementForm }
