import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'

interface INewOrgProps {
	org: Schema.OrgsFormData
}

const NewOrg = ({ ...data }: INewOrgProps) => {
	const title = 'New Org'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Orgs', href: Routes.orgs() },
			{ title: 'New Org' },
		] }>

			<Section>
				<Heading>{ title }</Heading>

				<OrgForm
					to={ Routes.orgs() }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
