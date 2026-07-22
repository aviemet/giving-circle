import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput, RichText } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type OrgFormData = {
	org: Schema.OrgsFormData
}

export interface OrgFormProps {
	to: string
	method?: HTTPVerb
	org: Schema.OrgsFormData
}

export const OrgForm = ({ to, method = "post", org }: OrgFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<OrgFormData>
			action={ to }
			initialData={ { org } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="org.name" label={ t("orgs.form.name") } />
				</Grid.Col>
				<Grid.Col>
					<RichText name="org.description" label={ t("orgs.form.description") } />
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ org.id ? t("orgs.form.update") : t("orgs.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
