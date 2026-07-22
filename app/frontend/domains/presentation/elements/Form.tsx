import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationElementFormData = {
	presentation_element: Schema.PresentationElementsFormData
}

export interface PresentationElementFormProps {
	to: string
	method?: HTTPVerb
	presentation_element: Schema.PresentationElementsFormData
}

export const PresentationElementForm = ({ to, method = "post", presentation_element }: PresentationElementFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<PresentationElementFormData>
			action={ to }
			initialData={ { presentation_element } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput
						name="presentation_element.data"
						label={ t("presentations.elements.form.data") }
					/>
				</Grid.Col>
				<Grid.Col>
					<TextInput
						name="presentation_element.name"
						label={ t("presentations.elements.form.name") }
					/>
				</Grid.Col>
				<Grid.Col>
					<TextInput
						name="presentation_element.template"
						label={ t("presentations.elements.form.template") }
					/>
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ presentation_element.id
							? t("presentations.elements.form.update")
							: t("presentations.elements.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
