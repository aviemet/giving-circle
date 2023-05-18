import React from 'react'
import { Form, TextInput, PasswordInput, Submit, Field } from '@/Components/Form'
import { Routes } from '@/lib'
import { Heading, Link } from '@/Components'
import { usePage } from '@inertiajs/react'
import { type UseFormProps } from 'use-inertia-form'

type TRegisterFormData = {
	user: {
		email: string
		password: string
		password_confirmation: string
	}
}

const firstRun = {
	heading: 'Create Admin User',
	description: 'Time to create your first user which  will be the admin for your inventory system',
}

const register = {
	heading: 'Sign Up',
	description: '',
}

const Register = () => {
	const { props } = usePage<SharedInertiaProps>()

	const handleFormChange = ({ data }: UseFormProps<TRegisterFormData>) => {
		// console.log({ data })
	}

	const handlePasswordChange = (value: string|number, { data, getError, clearErrors }: UseFormProps<TRegisterFormData>) => {
		if(getError('user.password') || getError('user.password_confirmation')) {
			if(data.user.password === data.user.password_confirmation) {
				clearErrors('user.password')
				clearErrors('user.password_confirmation')
			}
		}
	}

	const handleSubmit = ({ data, setError, errors, transform }: UseFormProps<TRegisterFormData>) => {
		if(data.user.password !== data.user.password_confirmation) {
			setError('user.password_confirmation', 'Passwords must match')
			return false
		}
	}

	const handleEmailBlur = (value: string|number, form: UseFormProps<TRegisterFormData>) => {
		// console.log({ value, form })
	}

	const content = props?.first_run ? firstRun : register

	return (
		<Form
			data={ {
				user: {
					email: '',
					password: '',
					password_confirmation: '',
				},
			} }
			model="user"
			to={ Routes.userRegistration() }
			onChange={ handleFormChange }
			onSubmit={ handleSubmit }
			grid={ false }
		>

			<div>
				<Heading>{ content.heading }</Heading>
				<p>{ content.description }</p>
			</div>

			<Field>
				<TextInput
					name="email"
					placeholder="Email"
					autoFocus
					autoComplete="Email"
					required
					onBlur={ handleEmailBlur }
				/>
			</Field>

			<Field>
				<PasswordInput
					name="password"
					placeholder="Password"
					autoComplete="new-password"
					required
					onChange={ handlePasswordChange }
				/>
			</Field>

			<Field>
				<PasswordInput
					name="password_confirmation"
					placeholder="Confirm Password"
					autoComplete="new-password"
					required
					onChange={ handlePasswordChange }
				/>
			</Field>

			<Field mb={ 16 }>
				<Submit className="large">Sign Up</Submit>
			</Field>

			<Link href={ Routes.newUserSession() }>Log In Instead</Link>

		</Form>
	)
}

export default Register
