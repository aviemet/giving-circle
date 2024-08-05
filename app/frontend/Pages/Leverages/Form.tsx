import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type LeverageFormData = {
	leverage: Schema.LeveragesFormData
}

export interface LeverageFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<LeverageFormData>) => boolean|void
	leverage: Schema.LeveragesFormData
}

const LeverageForm = ({ method = 'post', leverage, ...props }: LeverageFormProps) => {
	return (
		<Form
			model="leverage"
			data={ { leverage } }
			method={ method }
			{ ...props }
		>
			<Grid>
			
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="type" label="Type" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ leverage.id ? 'Update' : 'Create' } Leverage</Submit>
				</Grid.Col>
			</Grid.Col>
		</Form>
	)
}

export default LeverageForm
