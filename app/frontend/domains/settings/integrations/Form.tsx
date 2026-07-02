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
	return (
		<Form<SmtpFormData>
			action={ to }
			initialData={ { smtp } }
			method={ method }
		>
			<TextInput name="smtp.name" label="Name" required />

			<TextInput name="smtp.host" label="SMTP Server Address" required />

			<TextInput name="smtp.port" label="Port Number" required />

			<TextInput name="smtp.username" label="Username" required />

			<PasswordInput name="smtp.password" label="Password" required />

			<TextInput name="smtp.domain" label="Email Domain" required
				placeholder="e.g. mycompany.com"
			/>

			<TextInput name="smtp.address" label="Reply-To Address"
				placeholder="If not provided, will default to your username"
			/>

			<SegmentedControl name="smtp.security" label="Security" options={ [
				{ label: "None", value: "plain" },
				{ label: "TLS", value: "tls" },
				{ label: "SSL", value: "ssl" },
			] } />

			<RichText name="smtp.notes" label="Notes" />

			<Submit>
				Save SMTP Settings
			</Submit>
		</Form>
	)
}
