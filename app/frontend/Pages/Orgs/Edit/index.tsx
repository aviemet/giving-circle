import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgsForm from '../Form'

interface EditOrgProps {
	org: Schema.OrgsEdit
	circle: Schema.CirclesShare
}

const EditOrg = ({ org, circle }: EditOrgProps) => {
	const title = 'Edit Org'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<OrgsForm
					method='put'
					to={ Routes.circleOrg(circle.slug, org.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditOrg
