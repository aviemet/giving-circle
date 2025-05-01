import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

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
			<Submit>{ presentation_slide.id ? "Update" : "Create" } PresentationSlide</Submit>
		</Form>
	)
}

export default PresentationSlideForm
