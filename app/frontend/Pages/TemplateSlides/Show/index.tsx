import React from 'react'
import { Group, Heading, Menu, Page, Section } from '@/Components'
import { Routes } from '@/lib'

interface IShowTemplateSlideProps {
	template_slide: Schema.TemplateSlidesShow
}

const ShowTemplateSlide = ({ template_slide }: IShowTemplateSlideProps) => {
	const title =  'TemplateSlide'

	return (
		<Page title={ title }>
			<Section>
				<Group position="apart">
					<Heading>{ title }</Heading>

					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editTemplateSlide(template_slide.id) }>
								Edit TemplateSlide
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowTemplateSlide
