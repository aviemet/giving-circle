import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface ShowOrgProps {
	org: Schema.OrgsShow
}

const ShowOrg = ({ org }: ShowOrgProps) => {
	const title =  'Org'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Heading>{ title }</Heading>

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
