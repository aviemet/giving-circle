import React from "react"
import { type HTTPVerb, type UseFormProps } from "use-inertia-form"

import { Grid, Link, Text } from "@/components"
import { Form, TextInput, Submit } from "@/components/Form"
import { Routes } from "@/lib"

type ThemeMemberFormData = {
	membership: Schema.MembershipsFormData
}

export interface ThemeMemberFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<ThemeMemberFormData>) => boolean | void
	membership: Schema.MembershipsFormData
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

const ThemeMemberForm = ({ method = "post", membership, circle, theme, ...props }: ThemeMemberFormProps) => {
	return (
		<Form
			model="membership"
			data={ { membership } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Text>
					Creating a brand new member and adding them to the <Link href={ Routes.theme(circle.slug, theme.slug) }><strong>{ theme.name }</strong></Link> Theme
				</Text>
				<Grid.Col>
					<TextInput name="first_name" label="First Name" />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="last_name" label="Last Name" />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="number" label="Number" />
				</Grid.Col>

				<Grid.Col>
					<Submit>{ membership?.id ? "Update" : "Create" } Member</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default ThemeMemberForm
