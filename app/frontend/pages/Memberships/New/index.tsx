import { Page, Section } from "@/components"
import MembershipForm from "@/features/memberships/Form"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface NewMembershipProps {
	membership: Schema.MembershipsFormData
}

// @path: /:circle_slug/memberships/new
// @route: newCircleMembership
const NewMembership = ({ ...data }: NewMembershipProps) => {
	// copy @route above into the generic type assertion below
	const { params, active_circle } = usePageProps<"newCircleMembership">()

	if(!active_circle) return <></>

	const title = "New Member"

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: "Circles", href: Routes.circles() },
			{ title: active_circle.name, href: Routes.circle(params.circle_slug) },
			{ title: "Members", href: Routes.circleMemberships(params.circle_slug) },
			{ title: "New Member", href: window.location.href },
		] }>

			<Section>
				<MembershipForm
					to={ Routes.circleMemberships(params.circle_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewMembership
