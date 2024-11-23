import React from 'react'
import { Group, Title, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowThemeOrgProps {
	org: Schema.OrgsShow
}

// @path: /:circle_slug/themes/:theme_slug/orgs/:slug
// @route: themeOrg
const ShowThemeOrg = ({ org }: ShowThemeOrgProps) => {
	const { params } = usePageProps<'themeOrg'>()
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
								href={ Routes.editThemeOrg(params.circle_slug, params.theme_slug, params.slug) }
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

export default ShowThemeOrg
