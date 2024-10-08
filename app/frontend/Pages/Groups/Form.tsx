import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type TGroupFormData = {
	group: Schema.GroupsFormData
}

export interface GroupFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TGroupFormData>) => boolean|void
	group: Schema.GroupsFormData
}

const GroupForm = ({ method = 'post', group, ...props }: GroupFormProps) => {
	return (
		<Form
			model="group"
			data={ { group } }
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" />
			<Submit>{ group.id ? 'Update' : 'Create' } Group</Submit>
		</Form>
	)
}

export default GroupForm
