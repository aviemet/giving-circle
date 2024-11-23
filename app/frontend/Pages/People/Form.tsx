import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type TPersonFormData = {
	person: Schema.PeopleFormData
}

export interface PersonFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TPersonFormData>) => boolean | void
	person: Schema.PeopleFormData
}

const PersonForm = ({ method = 'post', person, ...props }: PersonFormProps) => {
	return (
		<Form
			model="person"
			data={ { person } }
			method={ method }
			{ ...props }
		>
			<TextInput name="first_name" label="First_name" />
			<TextInput name="last_name" label="Last_name" />
			<TextInput name="middle_name" label="Middle_name" />
			<TextInput name="active" label="Active" />
			<Submit>{ person.id ? 'Update' : 'Create' } Person</Submit>
		</Form>
	)
}

export default PersonForm
