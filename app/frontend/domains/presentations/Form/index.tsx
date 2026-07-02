import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { Select, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

export type PresentationFormData = {
	presentation: Schema.PresentationsFormData
}

export interface PresentationFormProps {
	to: string
	method?: HTTPVerb
	presentation: Schema.PresentationsFormData
	templates?: Schema.TemplatesIndex[]
}

export const PresentationForm = ({ to, method = "post", presentation, templates }: PresentationFormProps) => {
	const isNew = !presentation.id
	const templateOptions = (templates ?? []).map((template) => ({
		value: template.id,
		label: template.name ?? "",
	}))

	return (
		<Form<PresentationFormData>
			action={ to }
			initialData={ { presentation } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="presentation.name" label="Name" />
				</Grid.Col>

				{ isNew && templateOptions.length > 0 && (
					<Grid.Col>
						<Select
							name="presentation.template_id"
							label="Start from Presentation Template"
							placeholder="Blank presentation"
							options={ templateOptions }
							clearable
						/>
					</Grid.Col>
				) }

				<Grid.Col>
					<Submit>{ presentation.id ? "Update" : "Create" } Presentation</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
