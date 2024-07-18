import React from 'react'
import { Form, TextInput, Submit, FormProps } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'
import ConsoleLogger from '@/Components/Form/Components/ConsoleLogger'

type CircleFormData = {
	circle: Schema.CirclesFormData
}

export interface CircleFormProps extends FormProps<CircleFormData> {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<CircleFormData>) => boolean|void
	circle: Schema.CirclesFormData
}

const CircleForm = ({ method = 'post', circle, ...props }: CircleFormProps) => {
	return (
		<Form
			model="circle"
			data={ { circle } }
			method={ method }
			{ ...props }
		>
			<ConsoleLogger />
			<TextInput name="name" label="Name" />
			<Submit>{ circle.id ? 'Update' : 'Create' } Circle</Submit>
		</Form>
	)
}

export default CircleForm
