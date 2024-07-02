import React from 'react'
import { Routes } from '@/lib'
import { IndexPageTemplate } from '@/Layouts/AppLayout/Components'
import { NewIcon } from '@/Components/Icons'
import TemplateSlidesTable from '../Table'

interface ITemplateSlideIndexProps {
	template_slides: Schema.TemplateSlidesIndex[]
	pagination: Schema.Pagination
}

const TemplateSlidesIndex = ({ template_slides, pagination }: ITemplateSlideIndexProps) => {
	return (
		<IndexPageTemplate
			title="TemplateSlides"
			model="template_slides"
			rows={ template_slides }
			pagination={ pagination }
			deleteRoute={ Routes.templateSlides() }
			menuOptions={ [
				{ label: 'New Template Slide', href: Routes.newTemplateSlide(), icon: NewIcon },
			] }
		>
			<TemplateSlidesTable />
		</IndexPageTemplate>
	)
}

export default TemplateSlidesIndex
