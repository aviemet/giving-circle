import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TTemplateFormData = {
	template: Schema.TemplatesFormData
}

export interface ITemplateFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TTemplateFormData>) => boolean|void
	template: Schema.TemplatesFormData
}

const TemplateForm = ({ method = 'post', template, ...props }: ITemplateFormProps) => {
	return (
		<Form
			model="template"
			data={ { template } }
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" />
			<Submit>{ template.id ? 'Update' : 'Create' } Template</Submit>
		</Form>
	)
}

export default TemplateForm
