import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TThemeFormData = {
	theme: Schema.ThemesFormData
}

export interface IThemeFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TThemeFormData>) => boolean|void
	theme: Schema.ThemesFormData
}

const ThemeForm = ({ method = 'post', theme, ...props }: IThemeFormProps) => {
	return (
		<Form
			model="theme"
			data={ { theme } }
			method={ method }
			{ ...props }
		>
			<TextInput name="title" label="Title" />
			<Submit>{ theme.id ? 'Update' : 'Create' } Theme</Submit>
		</Form>
	)
}

export default ThemeForm
