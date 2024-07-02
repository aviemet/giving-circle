import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TPresentationElementFormData = {
	presentation_element: Schema.PresentationElementsFormData
}

export interface IPresentationElementFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TPresentationElementFormData>) => boolean|void
	presentation_element: Schema.PresentationElementsFormData
}

const PresentationElementForm = ({ method = 'post', presentation_element, ...props }: IPresentationElementFormProps) => {
	return (
		<Form
			model="presentation_element"
			data={ { presentation_element } }
			method={ method }
			{ ...props }
		>
			<TextInput name="title" label="Title" />
			<TextInput name="data" label="Data" />
			<TextInput name="element" label="Element" />
			<Submit>{ presentation_element.id ? 'Update' : 'Create' } PresentationElement</Submit>
		</Form>
	)
}

export default PresentationElementForm
