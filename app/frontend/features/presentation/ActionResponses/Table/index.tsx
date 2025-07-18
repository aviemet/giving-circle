import { Routes } from "@/lib"
import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"

interface PresentationActionResponseTableProps extends TableProps {
}

const PresentationActionResponseTable = (props: PresentationActionResponseTableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					
					
					<Table.Cell sort="response_data">Response_data</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_action_response: Schema.PresentationActionResponsesIndex) => (
					<Table.Row key={ presentation_action_response.id }>
						
						
						<Table.Cell>
							<Link href={ Routes.presentationActionResponse(presentation_action_response.id) }>{ presentation_action_response.response_data }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationActionResponse(presentation_action_response.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationActionResponseTable
