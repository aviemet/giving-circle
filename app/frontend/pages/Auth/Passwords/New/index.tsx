import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()
	const defaultData: { user: PasswordsNewFormData } = { user: { email: "" } }

	return (
		<Form action={ Routes.newUserPassword() } method="post" initialData={ defaultData }>
			<div>
				<Title>{ t("devise.ui.reset_password") }</Title>
			</div>

			<Field>
				<TextInput name="user.email" placeholder={ t("devise.ui.email") } autoComplete="Email" />
			</Field>

			<Field>
				<Submit>{ t("devise.ui.send_reset") }</Submit>
			</Field>

			<Link href={ Routes.newUserSession() }>{ t("devise.ui.log_in") }</Link>
		</Form>
	)
}

export default withLayout(PasswordsNew, "auth")
