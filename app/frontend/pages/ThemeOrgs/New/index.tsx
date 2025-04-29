import React from 'react'
import { Title, Page, Section } from '@/components'
import { Routes } from '@/lib'
import OrgForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewThemeOrgProps {
	org: Schema.OrgsFormData
}

// @path: /:circle_slug/themes/:theme_slug/orgs/new
// @route: newThemeOrg
const NewThemeOrg = ({ org }: NewThemeOrgProps) => {
	const { params } = usePageProps<'newThemeOrg'>()
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				<OrgForm
					to={ Routes.themeOrgs(params.circle_slug, params.theme_slug) }
					org={ org }
				/>
			</Section>

		</Page>
	)
}

export default NewThemeOrg
