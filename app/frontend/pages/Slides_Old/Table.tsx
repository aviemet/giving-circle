import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type ITableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

const PresentationSlideTable = (props: ITableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_slide: Schema.PresentationSlidesIndex) => (
					<Table.Row key={ presentation_slide.id }>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationSlide(presentation_slide.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationSlideTable
