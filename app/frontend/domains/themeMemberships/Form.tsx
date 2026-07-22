import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()

	return (
		<Form<ThemeMemberFormData>
			action={ to }
			initialData={ { membership } }
			method={ method }
		>
			<Grid>
				<Text>
					{ t("theme_memberships.form.helper_prefix") }
					{ " " }
					<Link href={ Routes.theme(circle.slug, theme.slug) }>
						<strong>{ theme.name }</strong>
					</Link>
					{ " " }
					{ t("theme_memberships.form.helper_suffix") }
				</Text>
				<Grid.Col>
					<TextInput name="membership.first_name" label={ t("theme_memberships.form.first_name") } />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="membership.last_name" label={ t("theme_memberships.form.last_name") } />
				</Grid.Col>

				<Grid.Col>
					<TextInput name="membership.number" label={ t("theme_memberships.form.number") } />
				</Grid.Col>

				<Grid.Col>
					<Submit>
						{ membership?.id ? t("theme_memberships.form.update") : t("theme_memberships.form.create") }
					</Submit>
				</Grid.Col>
			</Grid>
		</Form>
	)
}
