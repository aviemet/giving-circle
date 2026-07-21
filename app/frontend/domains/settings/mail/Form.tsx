import { useTranslation } from "react-i18next"

import { Form, Submit } from "@/components/Form"
import { PasswordInput, SegmentedControl, RichText, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type SmtpFormData = {
	smtp: Schema.SmtpsFormData
}

export interface SmtpFormProps {
	to: string
	method?: HTTPVerb
	smtp: Schema.SmtpsFormData
}

export const SmtpForm = ({ to, method = "post", smtp }: SmtpFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<SmtpFormData>
			action={ to }
			initialData={ { smtp } }
			method={ method }
		>
			<TextInput name="smtp.name" label={ t("settings.mail.form.name") } required />

			<TextInput name="smtp.host" label={ t("settings.mail.form.host") } required />

			<TextInput name="smtp.port" label={ t("settings.mail.form.port") } required />

			<TextInput name="smtp.username" label={ t("settings.mail.form.username") } required />

			<PasswordInput name="smtp.password" label={ t("settings.mail.form.password") } required />

			<TextInput
				name="smtp.domain"
				label={ t("settings.mail.form.domain") }
				required
				placeholder={ t("settings.mail.form.domain_placeholder") }
			/>

			<TextInput
				name="smtp.address"
				label={ t("settings.mail.form.address") }
				placeholder={ t("settings.mail.form.address_placeholder") }
			/>

			<SegmentedControl name="smtp.security" label={ t("settings.mail.form.security") } options={ [
				{ label: t("settings.mail.form.security_none"), value: "plain" },
				{ label: t("settings.mail.form.security_tls"), value: "tls" },
				{ label: t("settings.mail.form.security_ssl"), value: "ssl" },
			] } />

			<RichText name="smtp.notes" label={ t("settings.mail.form.notes") } />

			<Submit>
				{ t("settings.mail.form.save") }
			</Submit>
		</Form>
	)
}
