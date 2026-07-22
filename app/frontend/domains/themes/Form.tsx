import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type ThemeFormData = {
	theme: Schema.ThemesFormData
}

export interface ThemeFormProps {
	to: string
	method?: HTTPVerb
	theme: Schema.ThemesFormData
}

export function ThemeForm({ to, method = "post", theme }: ThemeFormProps) {
	const { t } = useTranslation()

	return (
		<Form<ThemeFormData>
			action={ to }
			initialData={ { theme } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="theme.name" label={ t("themes.form.name") } />
				</Grid.Col>

				<Grid.Col>
					<Submit>
						{ theme.id ? t("themes.form.update") : t("themes.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
