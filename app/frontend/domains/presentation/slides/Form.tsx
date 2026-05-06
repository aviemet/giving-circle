import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationSlideFormData = {
	slide: Schema.SlidesEdit
}

export interface PresentationSlideFormProps {
	slide: Schema.SlidesEdit
	to: string
	method?: HTTPVerb
}

export const PresentationSlideForm = ({ to, method = "post", slide }: PresentationSlideFormProps) => {
	return (
		<Form<PresentationSlideFormData>
			action={ to }
			initialData={ { slide } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="slide.name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.data" label="Data" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.order" label="Order" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.template" label="Template" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ slide.id ? "Update" : "Create" } PresentationSlide</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
