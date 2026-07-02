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
	return (
		<Form<TemplateFormData>
			action={ to }
			initialData={ { template } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="template.name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ template.id ? "Update" : "Create" } Template</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
