import { Divider, Grid, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { usePageProps } from "@/lib/hooks"
import { type HTTPVerb } from "@/lib/http"

import { SlidesSection } from "./SlidesSection"

export type TemplateFormData = {
	template: Schema.TemplatesEdit
}

export interface TemplateFormProps {
	to: string
	method?: HTTPVerb
	template: Schema.TemplatesEdit
}

const TemplateForm = ({ to, method = "post", template }: TemplateFormProps) => {
	const { active_circle } = usePageProps()

	return (
		<Form
			action={ to }
			initialData={ { template } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="template.name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					{ active_circle && <>
						<SlidesSection
							circle={ active_circle }
							template={ template }
						/>
					</> }
				</Grid.Col>

				<Grid.Col>
					<Title mt="sm" order={ 3 }>Actions</Title>

					<Divider mt="xs" mb="sm" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ template.id ? "Update" : "Create" } Template</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export { TemplateForm }
