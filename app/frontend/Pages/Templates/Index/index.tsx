import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import TemplatesTable from '../Table'
import { getCircleMenu } from '@/Layouts/AppLayout/AppSidebar/menus'

interface TemplateIndexProps {
	templates: Schema.PresentationTemplatesIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesOptions
}

const TemplatesIndex = ({ templates, pagination, circle }: TemplateIndexProps) => {
	return (
		<IndexPageTemplate
			title="Templates"
			model="templates"
			rows={ templates }
			pagination={ pagination }
			navMenu={ getCircleMenu({ circle }) }
			contextMenu={ {
				deleteRoute: Routes.circlePresentationTemplates(circle.slug),
				options: [
					{ label: 'New Template', href: Routes.newCirclePresentationTemplate(circle.slug), icon: <NewIcon /> },
				],
			} }
		>
			<TemplatesTable />
		</IndexPageTemplate>
	)
}

export default TemplatesIndex
