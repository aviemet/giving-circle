import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'

interface NewOrgProps {
	org: Schema.OrgsFormData
}

const NewOrg = ({ org }: NewOrgProps) => {
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgForm
					to={ Routes.themeOrgs() }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
