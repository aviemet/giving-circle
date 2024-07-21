import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowMemberProps {
	member: Schema.MembersShow
}

// @path: /circles/:circle_slug/themes/:theme_slug/members/:slug
// @route: circleThemeMember
const ShowMember = ({ member }: ShowMemberProps) => {
	const title =  'Member'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							{ /* <Menu.Link href={ Routes.editMember(member.id) }>
								Edit Member
							</Menu.Link> */ }
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowMember
