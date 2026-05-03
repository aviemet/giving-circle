import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type CircleFormData = {
	circle: Schema.CirclesFormData
}

export interface CircleFormProps {
	to: string
	method?: HTTPVerb
	circle: Schema.CirclesFormData
}

export const CircleForm = ({ to, method = "post", circle }: CircleFormProps) => {
	return (
		<Form<CircleFormData>
			action={ to }
			initialData={ { circle } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="circle.name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ circle?.id ? "Update" : "Create" } Circle</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
