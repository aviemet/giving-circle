import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowGroupProps {
	group: Schema.GroupsShow
}

const ShowGroup = ({ group }: ShowGroupProps) => {
	const title =  group.name

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editGroup(group.slug) }>
								Edit Group
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowGroup
