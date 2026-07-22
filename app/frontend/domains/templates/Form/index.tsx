import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

export type TemplateFormData = {
	template: Schema.TemplatesEdit
}

export interface TemplateFormProps {
	to: string
	method?: HTTPVerb
	template: Schema.TemplatesEdit
}

export const TemplateForm = ({ to, method = "post", template }: TemplateFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<TemplateFormData>
			action={ to }
			initialData={ { template } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="template.name" label={ t("templates.form.name") } />
				</Grid.Col>

				<Grid.Col>
					<Submit>
						{ template.id ? t("templates.form.update") : t("templates.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
