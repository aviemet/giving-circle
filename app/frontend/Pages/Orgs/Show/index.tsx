import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface IShowOrgProps {
	org: Schema.OrgsShow
}

const ShowOrg = ({ org }: IShowOrgProps) => {
	const { params } = usePageProps()

	const title =  'Org'

	return (
		<Page title={ title }>
			<Section>
				<Group>
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editAdminCircleThemeOrg(params.circle_slug, params.theme_slug, org.slug) }>
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
