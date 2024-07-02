import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface NewOrgProps {
	org: Schema.OrgsFormData
}

const NewOrg = ({ ...data }: NewOrgProps) => {
	const { params } = usePageProps()

	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<OrgForm
					to={ Routes.themeOrgs(params.theme_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
