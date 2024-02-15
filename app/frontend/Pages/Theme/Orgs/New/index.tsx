import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'

interface INewOrgProps {
	org: Schema.OrgsFormData
}

const NewOrg = ({ org }: INewOrgProps) => {
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<OrgForm
					to={ Routes.themeOrgs() }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
