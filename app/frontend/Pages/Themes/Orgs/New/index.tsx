import React from 'react'
import { Title, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'

interface NewOrgProps {
	org: Schema.OrgsFormData
	theme: Schema.ThemesShallow
}

const NewOrg = ({ org, theme }: NewOrgProps) => {
	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Title>{ title }</Title>

				{ /* <OrgForm
					to={ Routes.circleThemeOrgs() }
					org={ org }
				/> */ }
			</Section>

		</Page>
	)
}

export default NewOrg
