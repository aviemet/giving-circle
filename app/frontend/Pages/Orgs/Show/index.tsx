import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowOrgProps {
	org: Schema.OrgsShow
}

// @path: /circles/:circle_slug/orgs/:slug
// @route: circleOrg
const ShowOrg = ({ org }: ShowOrgProps) => {
	const title =  'Org'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Title>{ title }</Title>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link
								href={ Routes.editCircleOrg(org.circle_id, org.slug) }
							>
								Edit Org
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowOrg
