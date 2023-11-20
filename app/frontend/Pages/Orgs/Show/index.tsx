import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowOrgProps {
	org: Schema.OrgsShow
}

const ShowOrg = ({ org }: IShowOrgProps) => {
	const title =  'Org'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Org', href: Routes.orgs() },
			{ title },
		] }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editOrg(org.id) }>
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
