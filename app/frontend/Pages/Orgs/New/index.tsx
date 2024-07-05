import React from 'react'
import { Heading, Page, Section } from '@/Components'
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
				<Heading>{ title }</Heading>

				<OrgForm
					to={ Routes.circleOrgs(org.circle_id) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
