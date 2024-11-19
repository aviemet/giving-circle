import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type PresentationElementFormData = {
	presentation_element: Schema.PresentationElementsFormData
}

export interface PresentationElementFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationElementFormData>) => boolean|void
	presentation_element: Schema.PresentationElementsFormData
}

const PresentationElementForm = ({ method = 'post', presentation_element, ...props }: PresentationElementFormProps) => {
	return (
		<Form
			model="presentation_element"
			data={ { presentation_element } }
			method={ method }
			{ ...props }
		>
			<Grid>
			
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="template" label="Template" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="data" label="Data" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_element.id ? 'Update' : 'Create' } PresentationElement</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationElementForm
