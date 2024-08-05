import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type VoteFormData = {
	vote: Schema.VotesFormData
}

export interface VoteFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<VoteFormData>) => boolean|void
	vote: Schema.VotesFormData
}

const VoteForm = ({ method = 'post', vote, ...props }: VoteFormProps) => {
	return (
		<Form
			model="vote"
			data={ { vote } }
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
					<Submit>{ vote.id ? 'Update' : 'Create' } Vote</Submit>
				</Grid.Col>
			</Grid.Col>
		</Form>
	)
}

export default VoteForm
