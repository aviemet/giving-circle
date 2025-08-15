import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

interface PresentationActionTableProps extends TableProps {
}

const PresentationActionTable = (props: PresentationActionTableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell sort="action_type">Action_type</Table.Cell>
					<Table.Cell sort="config">Config</Table.Cell>
					<Table.Cell sort="results">Results</Table.Cell>
					<Table.Cell sort="trigger_type">Trigger_type</Table.Cell>
					<Table.Cell sort="trigger_conditions">Trigger_conditions</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_action: Schema.PresentationActionsIndex) => (
					<Table.Row key={ presentation_action.id }>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.action_type }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.config }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.results }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.trigger_type }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationAction(presentation_action.id) }>{ presentation_action.trigger_conditions }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationAction(presentation_action.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationActionTable
