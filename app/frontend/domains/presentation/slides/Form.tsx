import { useTranslation } from "react-i18next"

import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type PresentationSlideFormData = {
	slide: Schema.SlidesEdit
}

export interface PresentationSlideFormProps {
	slide: Schema.SlidesEdit
	to: string
	method?: HTTPVerb
}

export const PresentationSlideForm = ({ to, method = "post", slide }: PresentationSlideFormProps) => {
	const { t } = useTranslation()

	return (
		<Form<PresentationSlideFormData>
			action={ to }
			initialData={ { slide } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="slide.name" label={ t("slides.form.name") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.data" label={ t("slides.form.data") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.order" label={ t("slides.form.order") } />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="slide.template" label={ t("slides.form.template") } />
				</Grid.Col>
				<Grid.Col>
					<Submit>
						{ slide.id ? t("slides.form.update") : t("slides.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
