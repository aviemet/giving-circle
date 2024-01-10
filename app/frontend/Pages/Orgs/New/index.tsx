import React from 'react'
import { Heading, Page, Section } from '@/Components'
import { Routes } from '@/lib'
import OrgForm from '../Form'
import { usePageProps } from '@/lib/hooks'

interface INewOrgProps {
	org: Schema.OrgsFormData
}

const NewOrg = ({ ...data }: INewOrgProps) => {
	const { params } = usePageProps()

	const title = 'New Org'

	return (
		<Page title={ title }>
			<Section>
				<Heading>{ title }</Heading>

				<OrgForm
					to={ Routes.adminCircleThemeOrgs(params.circle_slug, params.theme_slug) }
					{ ...data }
				/>
			</Section>

		</Page>
	)
}

export default NewOrg
