import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type PresentationLeverageFormData = {
	presentation_leverage: Schema.PresentationLeveragesFormData
}

export interface PresentationLeverageFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationLeverageFormData>) => boolean | void
	presentation_leverage: Schema.PresentationLeveragesFormData
}

const PresentationLeverageForm = ({ method = 'post', presentation_leverage, ...props }: PresentationLeverageFormProps) => {
	return (
		<Form
			model="presentation_leverage"
			data={ { presentation_leverage } }
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
					<Submit>{ presentation_leverage.id ? 'Update' : 'Create' } PresentationLeverage</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationLeverageForm
