import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgsForm from '../Form'

interface EditOrgProps {
	org: Schema.OrgsEdit
	circle: Schema.CirclesInertiaShare
}

const EditOrg = ({ org, circle }: EditOrgProps) => {
	const title = 'Edit Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

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
