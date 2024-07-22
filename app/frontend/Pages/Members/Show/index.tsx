import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowMemberProps {
	member: Schema.MembersShow
	circle: Schema.CirclesPersisted
}

// @path: /circles/:circle_slug/members/:slug
// @route: circleMember
const ShowMember = ({ member, circle }: ShowMemberProps) => {
	const { params } = usePageProps<'circleMember'>()
	const title = member.name

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(params.circle_slug) },
			{ title: 'Members', href: Routes.circleMembers(params.circle_slug) },
			{ title, href: Routes.circleMember(params.circle_slug, member.slug) },
		] }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleMember(params.circle_slug, member.slug) }>
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
