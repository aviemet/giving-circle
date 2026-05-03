import { Table } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

const PresentationSlideTable = (props: TableProps) => {
	const { params } = usePageProps<"themePresentationSlides">()

	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="data">Data</Table.Cell>
					<Table.Cell sort="order">Order</Table.Cell>
					<Table.Cell sort="template">Template</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (slide: Schema.SlidesIndex) => (
					<Table.Row key={ slide.id }>
						<Table.Cell>{ slide.title ?? slide.slug }</Table.Cell>
						<Table.Cell>{ JSON.stringify(slide.data) }</Table.Cell>
						<Table.Cell />
						<Table.Cell />
						<Table.Cell>
							<EditButton
								href={ Routes.editThemePresentationSlide(
									params.circle_slug,
									params.theme_slug,
									params.presentation_slug,
									slide.slug,
								) }
							/>
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export { PresentationSlideTable }
