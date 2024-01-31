import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TPresentationFormData = {
	presentation: Schema.PresentationsFormData
}

export interface IPresentationFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TPresentationFormData>) => boolean|void
	presentation: Schema.PresentationsFormData
}

const PresentationForm = ({ method = 'post', presentation, ...props }: IPresentationFormProps) => {
	return (
		<Form
			model="presentation"
			data={ { presentation } }
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" />
			<Submit>{ presentation.id ? 'Update' : 'Create' } Presentation</Submit>
		</Form>
	)
}

export default PresentationForm
