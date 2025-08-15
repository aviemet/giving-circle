import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Divider, Grid, Title } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { usePageProps } from "@/lib/hooks"

import SlidesSection from "./SlidesSection"

type PresentationFormData = {
	presentation: Schema.PresentationsEdit
}

export interface PresentationFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationFormData>) => boolean | void
	presentation: Schema.PresentationsEdit
}

const PresentationForm = ({ method = "post", presentation, ...props }: PresentationFormProps) => {
	const { active_circle } = usePageProps()

	return (
		<Form
			model="presentation"
			data={ { presentation } }
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
							presentation={ presentation }
						/>
					</> }
				</Grid.Col>

				<Grid.Col>

					<Title mt="sm" order={ 3 }>Actions</Title>

					<Divider mt="xs" mb="sm" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ presentation.id ? "Update" : "Create" } Presentation</Submit>
				</Grid.Col>

			</Grid>
		</Form>
	)
}

export default PresentationForm
