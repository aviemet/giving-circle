import { Button, Table, Link, Text } from "@/components"
import { EditButton } from "@/components/Button"
import { NewIcon } from "@/components/Icons"
import { type TableProps } from "@/components/Table/Table"
import { NewTemplateModal } from "@/features"
import { Routes } from "@/lib"

interface TemplateTableProps extends TableProps {
	circle: Schema.CirclesOptions
}

const TemplateTable = ({
	circle,
	...props
}: TemplateTableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator
					emptyDataContent={ circle.slug && <>
						<Text>{ circle.name || "This circle" } doesn&apos;t have any saved presentation templates</Text>
						<NewTemplateModal circle={ circle }><Button px="sm"><NewIcon /> Create One</Button></NewTemplateModal>
					</> }
					render={ (template: Schema.TemplatesIndex) => (
						<Table.Row key={ template.id }>
							<Table.Cell>
								<Link href={ Routes.circleTemplate(template.circle.slug, template.slug) }>{ template.name }</Link>
							</Table.Cell>

							<Table.Cell>
								<EditButton href={ Routes.editCircleTemplate(template.circle.slug, template.slug) } />
							</Table.Cell>
						</Table.Row>
					) } />
			</Table.Body>
		</Table>
	)
}

export default TemplateTable
