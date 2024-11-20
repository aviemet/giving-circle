import React from 'react'
import { Grid } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type MemberFormData = {
	member: Schema.MembersFormData
}

export interface MemberFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<MemberFormData>) => boolean | void
	member: Schema.MembersFormData
}

const MemberForm = ({ method = 'post', member, ...props }: MemberFormProps) => {
	return (
		<Form
			model="member"
			data={ { member } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="number" label="Number" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="funds" label="Funds" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="active" label="Active" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ member.id ? 'Update' : 'Create' } Member</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default MemberForm
