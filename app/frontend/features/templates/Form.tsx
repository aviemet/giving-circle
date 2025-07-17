import { HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { TemplateLayoutEditor } from "@/features/TemplateEditor"

type TemplateFormData = {
	template: Schema.TemplatesFormData
}

export interface TemplateFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TemplateFormData>) => boolean | void
	template: Schema.TemplatesFormData
}

const TemplateForm = ({ method = "post", template, ...props }: TemplateFormProps) => {
	return (
		<Form
			model="template"
			data={ { template } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<TemplateLayoutEditor />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ template.id ? "Update" : "Create" } Template</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default TemplateForm
