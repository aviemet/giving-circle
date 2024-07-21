import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'

interface NewOrgProps {
	org: Schema.OrgsFormData
}

// @path: /circles/:circle_slug/orgs/new
// @route: newCircleOrg
const NewOrg = ({ org }: NewOrgProps) => {
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgForm
					to={ Routes.circleOrgs(org.circle_id) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
