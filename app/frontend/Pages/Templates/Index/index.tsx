import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import TemplatesTable from '../Table'
import { Page } from '@/Components'

interface TemplateIndexProps {
	templates: Schema.PresentationTemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

const TemplatesIndex = ({ templates, pagination, circle }: TemplateIndexProps) => {
	return (
		<Page
			title="Templates"
		>
			<IndexTableTemplate
				model="templates"
				rows={ templates }
				pagination={ pagination }
			// contextMenu={ {
			// 	deleteRoute: Routes.circlePresentationTemplates(circle.slug),
			// 	options: [
			// 		{ label: 'New Template', href: Routes.newCirclePresentationTemplate(circle.slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<TemplatesTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default TemplatesIndex
