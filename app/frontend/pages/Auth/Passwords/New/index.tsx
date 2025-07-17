import { Title, Link } from "@/components"
import { Field, Form, TextInput, Submit } from "@/components/Form"
import { Routes, withLayout } from "@/lib"

type PasswordsNewFormData = {
	email: string
}

// @path: /users/password/new
// @route: newUserPassword
const PasswordsNew = () => {
	const defaultData: PasswordsNewFormData = {
		email: "",
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

export default withLayout(PasswordsNew, "auth")
