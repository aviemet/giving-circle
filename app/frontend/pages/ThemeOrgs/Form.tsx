import React from 'react'
import { Grid } from '@/components'
import { Form, TextInput, Submit, RichText } from '@/components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type ThemeOrgFormData = {
	org: Schema.OrgsFormData
}

export interface ThemeOrgFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<ThemeOrgFormData>) => boolean | void
	org: Schema.OrgsFormData
}

const ThemeOrgForm = ({ method = 'post', org, ...props }: ThemeOrgFormProps) => {
	return (
		<Form
			model="org"
			data={ { org } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<RichText name="description" label="Description" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ org.id ? 'Update' : 'Create' } Org</Submit>
				</Grid.Col>

			</Grid>
		</Form>
	)
}

export default ThemeOrgForm
