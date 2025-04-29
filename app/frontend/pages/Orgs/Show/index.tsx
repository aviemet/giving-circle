import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowOrgProps {
	org: Schema.OrgsShow
}

// @path: /:circle_slug/orgs/:slug
// @route: org
const ShowOrg = ({ org }: ShowOrgProps) => {
	const { params } = usePageProps<'org'>()
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
								href={ Routes.editOrg(params.circle_slug, org.slug) }
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
