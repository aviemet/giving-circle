import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import PresentationElementsTable from "@/features/presentation/elements/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface PresentationElementIndexProps {
	presentation_elements: Schema.PresentationElementsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements
// @route: themePresentationsElements
const PresentationElementsIndex = ({ presentation_elements, pagination }: PresentationElementIndexProps) => {
	// copy @route above into the generic type assertion below
	const { params } = usePageProps<"themePresentationsElements">()
	const title = "Element"

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
				contextMenu={
					[
						{
							label: "New Element",
							href: Routes.newPresentationElement(),
							icon: NewIcon,
							deleteRoute: Routes.presentationElements(),
						},
					]
				}
			>
				<PresentationElementsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationElementsIndex
