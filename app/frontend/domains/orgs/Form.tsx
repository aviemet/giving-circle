import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { RichText, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type OrgFormData = {
	org: Schema.OrgsFormData
}

export interface OrgFormProps {
	to: string
	method?: HTTPVerb
	org: Schema.OrgsFormData
}

export const OrgForm = ({ to, method = "post", org }: OrgFormProps) => {
	return (
		<Form<OrgFormData>
			action={ to }
			initialData={ { org } }
			method={ method }
		>
			<Grid>
				<Grid.Col>
					<TextInput name="org.name" label="Name" />
				</Grid.Col>

				<Grid.Col>
					<RichText name="org.description" label="Description" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ org.id ? "Update" : "Create" } Org</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
