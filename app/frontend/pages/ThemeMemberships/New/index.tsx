import { Page, Section } from "@/components"
import MemberForm from "@/features/themeMemberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface NewThemeMemberProps {
	member: Schema.MembersFormData
	theme: Schema.ThemesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/memberships/new
// @route: newThemeMembership
const NewThemeMember = ({ ...data }: NewThemeMemberProps) => {
	const { params } = usePageProps<"newThemeMember">()
	const title = "New Member"

	return (
		<Page title={ title }>
			<Section>
				<MemberForm
					to={ Routes.circleThemeMembers(params.circle_slug, params.theme_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewThemeMember
