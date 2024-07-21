import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgsForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface EditOrgProps {
	org: Schema.OrgsEdit
}

// @path: /circles/:circle_slug/orgs/:slug/edit
// @route: editCircleOrg
const EditOrg = ({ org }: EditOrgProps) => {
	const { params } = usePageProps<'editCircleOrg'>()
	const title = 'Edit Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgsForm
					method='put'
					to={ Routes.circleOrg(params.circle_slug, params.slug) }
					org={ org }
				/>
			</Section>
		</Page>
	)
}

export default EditOrg
