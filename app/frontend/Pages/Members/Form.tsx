import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type TMemberFormData = {
	member: Schema.MembersFormData
}

export interface MemberFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TMemberFormData>) => boolean|void
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
			<TextInput name="first_name" label="First_name" />
			<TextInput name="last_name" label="Last_name" />
			<TextInput name="number" label="Number" />
			<Submit>{ member.id ? 'Update' : 'Create' } Member</Submit>
		</Form>
	)
}

export default MemberForm
