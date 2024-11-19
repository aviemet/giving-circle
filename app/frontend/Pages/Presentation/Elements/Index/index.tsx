import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Menu, Page, Title } from '@/Components'
import { NewIcon } from '@/Components/Icons'
import { IndexTableTemplate } from '@/Features'
import PresentationElementsTable from '../Table'

interface PresentationElementIndexProps {
	presentation_elements: Schema.PresentationElementsIndex[]
	pagination: Schema.Pagination
}

const PresentationElementsIndex = ({ presentation_elements, pagination }: PresentationElementIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<''>()
	const title = Element

	return (
		<Page
			title={ title }
			siteTitle={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link href={ Routes.newPresentationElement() } icon={ <NewIcon /> }>
						New Element
					</Menu.Link>
				</Menu>
			</> }
		>
		<IndexTableTemplate
			title="PresentationElements"
			model="presentation_elements"
			rows={ presentation_elements }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.presentationElements(),
				[
					{ label: 'New Element', href: Routes.newPresentationElement(), icon: NewIcon },
				]
			} }
		>
			<PresentationElementsTable />
		</IndexTableTemplate>
		</Page>
	)
}

export default PresentationElementsIndex
