import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"

type PresentationSlideFormData = {
	slide: Schema.SlidesEdit
}

export interface PresentationSlideFormProps {
	slide: Schema.SlidesEdit
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationSlideFormData>) => boolean | void
}

const PresentationSlideForm = ({ method = "post", slide, ...props }: PresentationSlideFormProps) => {
	console.log({ slide })
	return (
		<Form
			model="slide"
			data={ { slide } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="data" label="Data" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="order" label="Order" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="template" label="Template" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ slide.id ? "Update" : "Create" } PresentationSlide</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationSlideForm
