import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { CurrencyInput, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type MembershipFormData = {
	membership: Schema.MembershipsFormData
}

export interface MembershipFormProps {
	to: string
	method?: HTTPVerb
	membership: Schema.MembershipsFormData
}

export const MembershipForm = ({ to, method = "post", membership }: MembershipFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<MembershipFormData>
			action={ to }
			initialData={ { membership } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="membership.number" label={ t("memberships.form.number") } />
				</Grid.Col>
				<Grid.Col>
					<CurrencyInput name="membership.funds" label={ t("memberships.form.funds") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="membership.active" label={ t("memberships.form.active") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="membership.name" label={ t("memberships.form.name") } />
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ membership.id ? t("memberships.form.update") : t("memberships.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
