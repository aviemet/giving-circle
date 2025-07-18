import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

const PresentationDistributionTable = (props: TableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="type">Type</Table.Cell>
					<Table.Cell sort="template">Template</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation_distribution: Schema.PresentationDistributionsIndex) => (
					<Table.Row key={ presentation_distribution.id }>
						<Table.Cell>
							<Link href={ Routes.presentationDistribution(presentation_distribution.id) }>{ presentation_distribution.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationDistribution(presentation_distribution.id) }>{ presentation_distribution.type }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.presentationDistribution(presentation_distribution.id) }>{ presentation_distribution.template }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editPresentationDistribution(presentation_distribution.id) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationDistributionTable
