import React from 'react'
import { Grid } from '@/components'
import { Form, TextInput, Submit } from '@/components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'

type TThemeFormData = {
	theme: Schema.ThemesFormData
}

export interface ThemeFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TThemeFormData>) => boolean | void
	theme: Schema.ThemesFormData
}

const ThemeForm = ({ method = 'post', theme, ...props }: ThemeFormProps) => {
	return (
		<Form
			model="theme"
			data={ { theme } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ theme.id ? 'Update' : 'Create' } Theme</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default ThemeForm
