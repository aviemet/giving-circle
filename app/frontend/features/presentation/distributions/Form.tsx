import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"

type PresentationDistributionFormData = {
	presentation_distribution: Schema.PresentationDistributionsFormData
}

export interface PresentationDistributionFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<PresentationDistributionFormData>) => boolean | void
	presentation_distribution: Schema.PresentationDistributionsFormData
}

const PresentationDistributionForm = ({ method = "post", presentation_distribution, ...props }: PresentationDistributionFormProps) => {
	return (
		<Form
			model="presentation_distribution"
			data={ { presentation_distribution } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="type" label="Type" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="template" label="Template" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ presentation_distribution.id ? "Update" : "Create" } PresentationDistribution</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default PresentationDistributionForm
