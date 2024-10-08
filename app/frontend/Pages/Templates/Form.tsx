import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { HTTPVerb, type UseFormProps } from 'use-inertia-form'
import { PresentationLayoutEditor } from '@/Features/PresentationEditor'

type TTemplateFormData = {
	template: Schema.PresentationTemplatesFormData
}

export interface TemplateFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TTemplateFormData>) => boolean|void
	template: Schema.PresentationTemplatesFormData
}

const TemplateForm = ({ method = 'post', template, ...props }: TemplateFormProps) => {
	return (
		<Form
			model="template"
			data={ { template } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<PresentationLayoutEditor />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ template.id ? 'Update' : 'Create' } Template</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default TemplateForm
