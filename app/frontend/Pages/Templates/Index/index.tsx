import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import TemplatesTable from '../Table'

interface ITemplateIndexProps {
	templates: Schema.TemplatesIndex[]
	pagination: Schema.Pagination
}

const TemplatesIndex = ({ templates, pagination }: ITemplateIndexProps) => {
	return (
		<IndexPageTemplate
			title="Templates"
			model="templates"
			rows={ templates }
			pagination={ pagination }
			deleteRoute={ Routes.templates() }
			menuOptions={ [
				{ label: 'New Template', href: Routes.newTemplate(), icon: NewIcon },
			] }
		>
			<TemplatesTable />
		</IndexPageTemplate>
	)
}

export default TemplatesIndex
