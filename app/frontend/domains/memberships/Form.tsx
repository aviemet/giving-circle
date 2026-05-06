import { Grid } from "@/components"
import { Form, Submit } from "@/components/Form"
import { CurrencyInput, TextInput } from "@/components/Inputs"
import { type HTTPVerb } from "@/lib/http"

type MembershipFormData = {
	membership: Schema.MembershipsFormData
}

export interface MembershipFormProps {
	to: string
	method?: HTTPVerb
	membership: Schema.MembershipsFormData
}

export const MembershipForm = ({ to, method = "post", membership }: MembershipFormProps) => {
	return (
		<Form<MembershipFormData>
			action={ to }
			initialData={ { membership } }
			method={ method }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="membership.number" label="Number" />
				</Grid.Col>
				<Grid.Col>
					<CurrencyInput name="membership.funds" label="Funds" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="membership.active" label="Active" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="membership.name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ membership.id ? "Update" : "Create" } Membership</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
