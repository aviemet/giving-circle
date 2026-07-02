import { Menu, Page, Title } from "@/components"
import { NewIcon } from "@/components/Icons"
import { PresentationElementsTable } from "@/domains/presentation/elements/Table"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"


interface PresentationElementIndexProps {
	presentation_elements: Schema.PresentationElementsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/themes/:theme_slug/presentations/:presentation_slug/elements
// @route: themePresentationElements
const PresentationElementsIndex = ({ presentation_elements, pagination }: PresentationElementIndexProps) => {
	const { params } = usePageProps<"themePresentationElements">()
	const title = "Element"

	return (
		<Page
			title={ title }
			heading={ <>
				<Title>{ title }</Title>
				<Menu>
					<Menu.Link
						href={ Routes.newThemePresentationElement(
							params.circle_slug,
							params.theme_slug,
							params.presentation_slug,
						) }
						icon={ <NewIcon /> }
					>
						New Element
					</Menu.Link>
				</Menu>
			</> }
		>
			<IndexTableTemplate
				model="presentation_elements"
				pagination={ pagination }
				contextMenu={ {
					options: [
						{
							label: "New Element",
							href: Routes.newThemePresentationElement(
								params.circle_slug,
								params.theme_slug,
								params.presentation_slug,
							),
							icon: <NewIcon />,
						},
					],
					deleteRoute: Routes.themePresentationElements(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
					),
				} }
			>
				<PresentationElementsTable
					records={ presentation_elements }
					pagination={ pagination }
					model="presentation_elements"
				/>
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationElementsIndex
