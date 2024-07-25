import React from 'react'
import { Group, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowMemberProps {
	member: Schema.MembersShow
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/:slug
// @route: circleThemeMember
const ShowMember = ({ member }: ShowMemberProps) => {
	const { params, menu } = usePageProps<'circleThemeMember'>()
	const title = member?.name || 'Member'

	if(!menu.active_circle) return <></>

	return (
		<Page
			title={ title }
			breadcrumbs={ [
				{ title: 'Circles', href: Routes.circles() },
				{ title: menu.active_circle.name, href: Routes.circle(params.circle_slug) },
				{ title: 'Members', href: Routes.circleMembers(params.circle_slug) },
				{ title, href: Routes.circleMember(params.circle_slug, member.slug) },
			] }
		>
			<Section>
				<Group>
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleThemeMember(params.circle_slug, params.theme_slug, params.slug) }>
								Edit Member
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>


			</Section>
		</Page>
	)
}

export default ShowMember
