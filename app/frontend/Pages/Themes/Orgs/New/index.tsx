import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/themes/:theme_slug/orgs/new
// @route: newThemeOrg
const NewOrg = ({ org }: NewOrgProps) => {
	const { params } = usePageProps<'newCircleThemeOrg'>()
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgForm
					to={ Routes.circleThemeOrgs(params.circle_slug, params.theme_slug) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
