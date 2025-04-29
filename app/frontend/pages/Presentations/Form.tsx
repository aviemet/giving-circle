import React from 'react'
import { Grid } from '@/components'
import { Form, TextInput, Submit } from '@/components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'
import { SlideCard } from '@/features/Cards'
import CardContainer from '@/features/Cards/CardContainer'

type TPresentationFormData = {
	presentation: Schema.PresentationsFormData
}

export interface PresentationFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TPresentationFormData>) => boolean | void
	presentation: Schema.PresentationsFormData
}

const PresentationForm = ({ method = 'post', presentation, ...props }: PresentationFormProps) => {
	return (
		<Form
			model="presentation"
			data={ { presentation } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<CardContainer>
						{ presentation.slides.map(slide => <SlideCard key={ slide.id } slide={ slide } />) }
					</CardContainer>
				</Grid.Col>

				<Grid.Col>
					<Submit>{ presentation.id ? 'Update' : 'Create' } Presentation</Submit>
				</Grid.Col>

			</Grid>
		</Form>
	)
}

export default PresentationForm
