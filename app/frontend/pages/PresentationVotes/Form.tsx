import React from 'react'
import { Grid } from '@/components'
import { Form, TextInput, Submit } from '@/components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type PresentationVoteFormData = {
	presentation_vote: Schema.PresentationVotesFormData
}

export interface PresentationVoteFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationVoteFormData>) => boolean | void
	presentation_vote: Schema.PresentationVotesFormData
}

const PresentationVoteForm = ({ method = 'post', presentation_vote, ...props }: PresentationVoteFormProps) => {
	return (
		<Form
			model="presentation_vote"
			data={ { presentation_vote } }
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
					<Submit>{ presentation_vote.id ? 'Update' : 'Create' } PresentationVote</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationVoteForm
