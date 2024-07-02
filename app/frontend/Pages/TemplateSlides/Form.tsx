import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TTemplateSlideFormData = {
	template_slide: Schema.TemplateSlidesFormData
}

export interface ITemplateSlideFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TTemplateSlideFormData>) => boolean|void
	template_slide: Schema.TemplateSlidesFormData
}

const TemplateSlideForm = ({ method = 'post', template_slide, ...props }: ITemplateSlideFormProps) => {
	return (
		<Form
			model="template_slide"
			data={ { template_slide } }
			method={ method }
			{ ...props }
		>
			<TextInput name="title" label="Title" />
			<TextInput name="content" label="Content" />
			<TextInput name="order" label="Order" />
			<Submit>{ template_slide.id ? 'Update' : 'Create' } TemplateSlide</Submit>
		</Form>
	)
}

export default TemplateSlideForm
