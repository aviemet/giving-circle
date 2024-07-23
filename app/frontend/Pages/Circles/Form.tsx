import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit, FormProps } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type CircleFormData = {
	circle: Schema.CirclesFormData
}

export interface CircleFormProps extends FormProps<CircleFormData> {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<CircleFormData>) => boolean|void
	circle: Schema.CirclesFormData
}

const CircleForm = ({ method = 'post', circle, ...props }: CircleFormProps) => {
	return (
		<Form
			model="circle"
			data={ { circle } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ circle?.id ? 'Update' : 'Create' } Circle</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default CircleForm
