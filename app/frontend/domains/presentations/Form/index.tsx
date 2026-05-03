import { Divider, Grid, Title } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { usePageProps } from "@/lib/hooks"
import { type HTTPVerb } from "@/lib/http"

import { SlidesSection } from "./SlidesSection"

type PresentationFormData = {
	presentation: Schema.PresentationsEdit
}

export interface PresentationFormProps {
	to: string
	method?: HTTPVerb
	presentation: Schema.PresentationsEdit
}

export const PresentationForm = ({ to, method = "post", presentation }: PresentationFormProps) => {
	const { active_circle } = usePageProps()

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
