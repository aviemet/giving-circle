import React from 'react'
import { Form, TextInput, Submit, RichText } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type TOrgFormData = {
	org: Schema.OrgsFormData
}

export interface OrgFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TOrgFormData>) => boolean|void
	org: Schema.OrgsFormData
}

const OrgForm = ({ method = 'post', org, ...props }: OrgFormProps) => {
	return (
		<Form
			model="org"
			data={ { org } }
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" />
			<RichText name="description" label="Description" />
			<Submit>{ org.id ? 'Update' : 'Create' } Org</Submit>
		</Form>
	)
}

export default OrgForm
