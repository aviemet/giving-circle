import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowMemberProps {
	member: Schema.MembersShow
	circle: Schema.CirclesShare
}

const ShowMember = ({ member, circle }: ShowMemberProps) => {
	const title = member.name

	return (
		<Page title={ title } breadcrumbs={ (circle?.name && circle?.slug) ? [
			{ title: 'Circles', href: Routes.circles() },
			{ title: circle.name, href: Routes.circle(circle.slug) },
			{ title: 'Members', href: Routes.circleMembers(circle.slug) },
			{ title, href: Routes.circleMember(circle.slug, member.slug) },
		] : [] }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editCircleMember(circle.slug, member.slug) }>
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
