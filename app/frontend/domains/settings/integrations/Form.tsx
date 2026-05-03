import { omit } from "es-toolkit/compat"

import { Group } from "@/components"
import { TestResponseButton } from "@/components/Button"
import { Form, type FormProps, Submit, FormConsumer } from "@/components/Form"
import { PasswordInput, SegmentedControl, RichText, TextInput } from "@/components/Inputs"
import { Routes, isUnset } from "@/lib"

type SmtpFormData = {
	smtp: Schema.SmtpsFormData
}

export interface SmtpFormProps extends FormProps<SmtpFormData> {
	data: SmtpFormData
}

const requiredFields = ["smtp.host", "smtp.port", "smtp.domain", "smtp.username", "smtp.password"]

export const SmtpForm = ({ method = "post", ...props }: SmtpFormProps) => {
	return (
		<Form
			model="smtp"
			method={ method }
			{ ...props }
		>
			<TextInput name="name" label="Name" required />

			<TextInput name="host" label="SMTP Server Address" required />

			<TextInput name="port" label="Port Number" required />

			<TextInput name="username" label="Username" required />

			<PasswordInput name="password" label="Password" required />

			<TextInput name="domain" label="Email Domain" required
				placeholder="e.g. mycompany.com"
			/>

			<TextInput name="address" label="Reply-To Address"
				placeholder="If not provided, will default to your username"
			/>

			<SegmentedControl name="security" label="Security" options={ [
				{ label: "None", value: "basic" },
				{ label: "TLS", value: "tls" },
				{ label: "SSL", value: "ssl" },
			] } />

			<Group pt="md" pb="xs" justify="right">
				<FormConsumer<SmtpFormData>>{ ({ data, getData }) => (
					<TestResponseButton
						method="post"
						endpoint={ Routes.apiSmtpTest() }
						data={ { smtp: omit(data.smtp, "id") } }
						disabled={ requiredFields.some(field => isUnset(getData(field))) }
					/>
				) }</FormConsumer>
			</Group>

			<RichText name="notes" label="Notes" />

			<Submit>
				Save SMT Settings
			</Submit>
		</Form>
	)
}


