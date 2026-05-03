import { Grid, Link, Text } from "@/components"
import { Form, Submit } from "@/components/Form"
import { TextInput } from "@/components/Inputs"
import { Routes } from "@/lib"
import { type HTTPVerb } from "@/lib/http"

type ThemeMemberFormData = {
	membership: Schema.MembershipsFormData
}

export interface ThemeMemberFormProps {
	to: string
	method?: HTTPVerb
	membership: Schema.MembershipsFormData
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

export const ThemeMemberForm = ({ to, method = "post", membership, circle, theme }: ThemeMemberFormProps) => {
	return (
		<Form<ThemeMemberFormData>
			action={ to }
			initialData={ { membership } }
			method={ method }
		>
			<Grid>
				<Text>
					Creating a brand new member and adding them to the <Link href={ Routes.theme(circle.slug, theme.slug) }><strong>{ theme.name }</strong></Link> Theme
				</Text>
				<Grid.Col>
					<TextInput name="membership.first_name" label="First Name" />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="membership.last_name" label="Last Name" />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="membership.number" label="Number" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ membership?.id ? "Update" : "Create" } Member</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
