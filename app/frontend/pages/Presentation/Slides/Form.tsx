import React from "react"
import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"

type PresentationSlideFormData = {
	presentation_slide: Schema.PresentationSlidesFormData
}

export interface PresentationSlideFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationSlideFormData>) => boolean | void
	presentation_slide: Schema.PresentationSlidesFormData
}

const PresentationSlideForm = ({ method = "post", presentation_slide, ...props }: PresentationSlideFormProps) => {
	return (
		<Form
			model="presentation_slide"
			data={ { presentation_slide } }
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
					<Submit>{ presentation_slide.id ? "Update" : "Create" } PresentationSlide</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationSlideForm
