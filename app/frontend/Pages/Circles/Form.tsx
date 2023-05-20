import React from 'react'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type UseFormProps } from 'use-inertia-form'

type TCircleFormData = {
	circle: Schema.CirclesFormData
}

export interface ICircleFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TCircleFormData>) => boolean|void
	circle: Schema.CirclesFormData
}

const CircleForm = ({ method = 'post', circle, ...props }: ICircleFormProps) => {
	return (
		<Form
			model="circle"
			data={ { circle } }
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" />
			<Submit>{ circle.id ? 'Update' : 'Create' } Circle</Submit>
		</Form>
	)
}

export default CircleForm
