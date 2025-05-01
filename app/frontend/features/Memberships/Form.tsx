import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"

type MembershipFormData = {
	membership: Schema.MembershipsFormData
}

export interface MembershipFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<MembershipFormData>) => boolean | void
	membership: Schema.MembershipsFormData
}

const MembershipForm = ({ method = "post", membership, ...props }: MembershipFormProps) => {
	return (
		<Form
			model="membership"
			data={ { membership } }
			method={ method }
			{ ...props }
		>
			<Grid>

				<Grid.Col>
					<TextInput name="number" label="Number" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="funds" label="Funds" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="active" label="Active" />
				</Grid.Col>
				<Grid.Col>
					<TextInput name="name" label="Name" />
				</Grid.Col>
				<Grid.Col>
					<Submit>{ membership.id ? "Update" : "Create" } Membership</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default MembershipForm
