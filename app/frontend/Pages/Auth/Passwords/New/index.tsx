import React from 'react'
import { Field, Form, TextInput, Submit } from '@/Components/Form'
import { Routes } from '@/lib'
import { Title, Link } from '@/Components'

type TPasswordsNewFormData = {
	email: string
}

const PasswordsNew = () => {
	const defaultData: TPasswordsNewFormData = {
		email: '',
	}

	return (
		<Form model="user" data={ defaultData } to={ Routes.newUserPassword() } grid={ false }>
			<div>
				<Title>Reset Password</Title>
			</div>

			<Field>
				<TextInput name="email" placeholder="Email" autoComplete="Email" />
			</Field>

			<Field>
				<Submit>Send Reset Instructions</Submit>
			</Field>

			<Link href={ Routes.newUserSession() }>Log In</Link>
		</Form>
	)
}

export default PasswordsNew
