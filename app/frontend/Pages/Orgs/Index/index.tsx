import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import OrgsTable from '../Table'

interface IOrgIndexProps {
	orgs: Schema.OrgsIndex[]
	pagination: Schema.Pagination
}

const OrgsIndex = ({ orgs, pagination }: IOrgIndexProps) => {
	return (
		<IndexPageTemplate
			title="Orgs"
			model="orgs"
			rows={ orgs }
			pagination={ pagination }
			deleteRoute={ Routes.orgs() }
			menuOptions={ [
				{ label: 'New Org', href: Routes.newOrg(), icon: NewIcon },
			] }
		>
			<OrgsTable />
		</IndexPageTemplate>
	)
}

export default OrgsIndex
