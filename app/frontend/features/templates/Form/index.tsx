import { HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Divider, Grid, Title } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { usePageProps } from "@/lib/hooks"

import SlidesSection from "./SlidesSection"

export type TemplateFormData = {
	template: Schema.TemplatesEdit
}

export interface TemplateFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TemplateFormData>) => boolean | void
	template: Schema.TemplatesEdit
}

const TemplateForm = ({ method = "post", template, ...props }: TemplateFormProps) => {
	const { active_circle } = usePageProps()

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

export default TemplateForm
