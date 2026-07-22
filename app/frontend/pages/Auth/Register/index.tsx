import { useTranslation } from "react-i18next"

import { Box, Title, Link } from "@/components"
import { Form, FormConsumer, Submit } from "@/components/Form"
import { Field, PasswordInput, TextInput } from "@/components/Inputs"
import { Routes, withLayout } from "@/lib"

// @path: /users/register
// @route: newUserRegistration
const Register = () => {
	const { t } = useTranslation()
	const isRecord = (value: unknown): value is Record<string, unknown> => (
		value !== null && typeof value === "object" && !Array.isArray(value)
	)

	return (
		<Form
			initialData={ {
				user: {
					email: "",
					password: "",
					password_confirmation: "",
				},
			} }
			action={ Routes.userRegistration() }
			method="post"
		>
			<FormConsumer
				onChange={ ({ getFormData, slotProps }) => {
					const data = getFormData()
					const user = isRecord(data.user) ? data.user : null
					const password = typeof user?.password === "string" ? user.password : ""
					const confirmation = typeof user?.password_confirmation === "string" ? user.password_confirmation : ""

					if(password !== "" && confirmation !== "" && password !== confirmation) {
						slotProps?.setError("user.password_confirmation", t("devise.ui.passwords_must_match"))
					} else {
						slotProps?.clearErrors("user.password_confirmation")
					}
				} }
			/>

			<Box>
				<Title>{ t("devise.ui.sign_up") }</Title>
			</Box>

			<Field>
				<TextInput
					name="user.email"
					placeholder={ t("devise.ui.email") }
					autoComplete="Email"
					required
				/>
			</Field>

			<Field>
				<PasswordInput
					name="user.password"
					placeholder={ t("devise.ui.password") }
					autoComplete="new-password"
					required
				/>
			</Field>

			<Field>
				<PasswordInput
					name="user.password_confirmation"
					placeholder={ t("devise.ui.confirm_password") }
					autoComplete="new-password"
					required
				/>
			</Field>

			<Field mb={ 16 }>
				<Submit className="large">{ t("devise.ui.sign_up") }</Submit>
			</Field>

			<Link href={ Routes.newUserSession() }>{ t("devise.ui.log_in_instead") }</Link>

		</Form>
	)
}

export default withLayout(Register, "auth")
