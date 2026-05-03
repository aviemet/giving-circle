import { Title, Link } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Field, TextInput } from "@/components/Inputs"
import { Routes, withLayout } from "@/lib"

type PasswordsNewFormData = {
	email: string
}

// @path: /users/password/new
// @route: newUserPassword
const PasswordsNew = () => {
	const defaultData: { user: PasswordsNewFormData } = { user: { email: "" } }

	return (
		<Form action={ Routes.newUserPassword() } method="post" initialData={ defaultData }>
			<div>
				<Title>Reset Password</Title>
			</div>

			<Field>
				<TextInput name="user.email" placeholder="Email" autoComplete="Email" />
			</Field>

			<Field>
				<Submit>Send Reset Instructions</Submit>
			</Field>

			<Link href={ Routes.newUserSession() }>Log In</Link>
		</Form>
	)
}

export default withLayout(PasswordsNew, "auth")
