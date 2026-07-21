import { useTranslation } from "react-i18next"

import { Title, Link } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { Routes, withLayout } from "@/lib"

interface ConfirmationsNew {
	user: Schema.User
}

// @path: /users/confirmation/new
// @route: newUserConfirmation
const ConfirmationsNew = ({ user }: ConfirmationsNew) => {
	const { t } = useTranslation()

	return (
		<Form
			action={ Routes.userConfirmation() }
			method="post"
			initialData={ { user } }
		>
			<div>
				<Title order={ 3 }>{ t("devise.ui.check_email") }</Title>
				<p>{ t("devise.ui.check_email_body") }</p>
				<p>{ t("devise.ui.check_email_resend") }</p>
			</div>

			<div>
				<TextInput name="user.email" placeholder={ t("devise.ui.email") } autoComplete="Email" required />
			</div>

			<div>
				<Submit className="large">{ t("devise.ui.resend_confirmation") }</Submit>
			</div>

			<Link href={ Routes.newUserRegistration() }>{ t("devise.ui.register") }</Link>
			<Link href={ Routes.newUserSession() }>{ t("devise.ui.log_in_instead") }</Link>

		</Form>
	)
}

export default withLayout(ConfirmationsNew, "auth")
