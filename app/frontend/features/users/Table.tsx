import { Link, Table } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

const UsersTable = (props: TableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="email" hideable={ false }>Email</Table.Cell>
					<Table.Cell style={ { textAlign: "right", paddingRight: "1rem" } }>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>

			<Table.Body>
				<Table.RowIterator render={ (user: Schema.UsersIndex) => (
					<Table.Row key={ user.id }>

						<Table.Cell nowrap>
							<Link href={ Routes.user(user.id) }>{ user.email }</Link>
						</Table.Cell>

						<Table.Cell fitContent>
							<EditButton href={ Routes.editUser(user.id) } label={ user.person?.name || user.email } />
						</Table.Cell>

					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default UsersTable
