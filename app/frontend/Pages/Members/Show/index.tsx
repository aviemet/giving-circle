import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowMemberProps {
	member: Schema.MembersShow
}

const ShowMember = ({ member }: IShowMemberProps) => {
	const title =  'Member'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Member', href: Routes.members() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editMember(member.id) }>
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
