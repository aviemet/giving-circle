import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgsForm from '../Form'

interface EditOrgProps {
	org: Schema.OrgsEdit
}

const EditOrg = ({ org }: EditOrgProps) => {
	const title = 'Edit Org'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<OrgsForm
					method='put'
					to={ Routes.org(org.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditOrg
