import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type PresentationDistributionFormData = {
	presentation_distribution: Schema.PresentationDistributionsFormData
}

export interface PresentationDistributionFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationDistributionFormData>) => boolean|void
	presentation_distribution: Schema.PresentationDistributionsFormData
}

const PresentationDistributionForm = ({ method = 'post', presentation_distribution, ...props }: PresentationDistributionFormProps) => {
	return (
		<Form
			model="presentation_distribution"
			data={ { presentation_distribution } }
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
					<Submit>{ presentation_distribution.id ? 'Update' : 'Create' } PresentationDistribution</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationDistributionForm
