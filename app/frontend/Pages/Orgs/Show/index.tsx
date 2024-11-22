import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowOrgProps {
	org: Schema.OrgsShow
}

// @path: /:circle_slug/orgs/:slug
// @route: org
const ShowOrg = ({ org }: ShowOrgProps) => {
	const { params } = usePageProps<'circleOrg'>()
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
								href={ Routes.editCircleOrg(params.circle_slug, params.slug) }
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
