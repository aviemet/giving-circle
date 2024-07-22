import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowGroupProps {
	group: Schema.GroupsShow
}

// @path: /groups/:slug
// @route: group
const ShowGroup = ({ group }: ShowGroupProps) => {
	const { params } = usePageProps<'group'>()
	const title =  group.name

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editGroup(params.slug) }>
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
