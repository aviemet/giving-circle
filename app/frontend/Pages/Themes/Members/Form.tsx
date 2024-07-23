import React from 'react'
import { Grid, Link, Text } from '@/Components'
import { Form, TextInput, Submit } from '@/Components/Form'
import { type HTTPVerb, type UseFormProps } from 'use-inertia-form'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

type TMemberFormData = {
	member: Schema.MembersFormData
}

export interface MemberFormProps {
	to: string
	method?: HTTPVerb
	onSubmit?: (object: UseFormProps<TMemberFormData>) => boolean|void
	member: Schema.MembersFormData
	theme: Schema.ThemesShallow
}

const MemberForm = ({ method = 'post', member, theme, ...props }: MemberFormProps) => {
	const { params } = usePageProps<'newCircleThemeMember'>()
	return (
		<Form
			model="member"
			data={ { member } }
			method={ method }
			{ ...props }
		>
			<Grid>
				<Text>
					Creating a brand new member and adding them the <Link href={ Routes.circleTheme(params.circle_slug, params.theme_slug) }><strong>{ theme.name }</strong></Link> Theme
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
					<Submit>{ member?.id ? 'Update' : 'Create' } Member</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}

export default MemberForm
