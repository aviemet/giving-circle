import React from 'react'
import { Group, Menu, Page, Section } from '@/components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'

interface ShowPresentationElementProps {
	presentation_element: Schema.PresentationElementsShow
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements/:id
// @route: themePresentationsElement
const ShowPresentationElement = ({ presentation_element }: ShowPresentationElementProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title =  'PresentationElement'

	return (
		<Page title={ title } breadcrumbs={ [
			{ title: 'Element', href: Routes.presentationElements() },
			{ title, href: window.location.href },
		] }>
			<Section>
				<Group position="apart">
					<Menu position="bottom-end">
						<Menu.Target />
						<Menu.Dropdown>
							<Menu.Link href={ Routes.editPresentationElement(presentation_element.id) }>
								Edit PresentationElement
							</Menu.Link>
						</Menu.Dropdown>
					</Menu>
				</Group>

			</Section>
		</Page>
	)
}

export default ShowPresentationElement
