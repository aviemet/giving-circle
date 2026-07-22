import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"

export type NewTemplateFormData = {
	template: {
		name: string
	}
}

interface NewTemplateFormProps {}

const NewTemplateForm = ({}: NewTemplateFormProps) => {
	const { t } = useTranslation()

	return (
		<Grid>
			<Grid.Col>
				<TextInput label={ t("templates.form.name") } name="template.name" />
			</Grid.Col>

			<Grid.Col>
				<Submit>{ t("templates.form.get_started") }</Submit>
			</Grid.Col>

		</Grid>
	)
}

export { NewTemplateForm }
