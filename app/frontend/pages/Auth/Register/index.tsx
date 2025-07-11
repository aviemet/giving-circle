import { type UseFormProps } from "use-inertia-form"

import { Box, Title, Link } from "@/components"
import { Form, TextInput, PasswordInput, Submit, Field } from "@/components/Form"
import { Routes, withLayout } from "@/lib"

type TRegisterFormData = {
	user: {
		email: string
		password: string
		password_confirmation: string
	}
}

// @path: /users/register
// @route: newUserRegistration
const Register = () => {
	const handleFormChange = ({ data }: UseFormProps<TRegisterFormData>) => {
		// console.log({ data })
	}

	const handlePasswordChange = (value: string | number, { data, getError, clearErrors }: UseFormProps<TRegisterFormData>) => {
		if(getError("user.password") || getError("user.password_confirmation")) {
			if(data.user.password === data.user.password_confirmation) {
				clearErrors("user.password")
				clearErrors("user.password_confirmation")
			}
		}
	}

	const handleSubmit = ({ data, setError, errors, transform }: UseFormProps<TRegisterFormData>) => {
		if(data.user.password !== data.user.password_confirmation) {
			setError("user.password_confirmation", "Passwords must match")
			return false
		}
	}

	const handleEmailBlur = (value: string | number, form: UseFormProps<TRegisterFormData>) => {
		// console.log({ value, form })
	}

	return (
		<Form
			data={ {
				user: {
					email: "",
					password: "",
					password_confirmation: "",
				},
			} }
			model="user"
			to={ Routes.userRegistration() }
			onChange={ handleFormChange }
			onSubmit={ handleSubmit }
			grid={ false }
		>

			<Box>
				<Title>Sign Up</Title>
			</Box>

			<Field>
				<TextInput
					name="email"
					placeholder="Email"
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

export default withLayout(Register, "auth")
