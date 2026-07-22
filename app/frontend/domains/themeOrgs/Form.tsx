import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { RichText, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type ThemOrgFormData = {
	org: Schema.OrgsFormData
}

export interface ThemeOrgFormProps {
	to: string
	method?: HTTPVerb
	org: Schema.OrgsFormData
}

export const ThemeOrgForm = ({ to, method = "post", org }: ThemeOrgFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<ThemOrgFormData>
			action={ to }
			initialData={ { org } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="org.name" label={ t("theme_orgs.form.name") } />
				</Grid.Col>

				<Grid.Col>
					<RichText name="org.description" label={ t("theme_orgs.form.description") } />
				</Grid.Col>

				<Grid.Col>
					<Submit>
						{ org.id ? t("theme_orgs.form.update") : t("theme_orgs.form.create") }
					</Submit>
				</Grid.Col>

			</Grid>
		</Form>
	)
}
