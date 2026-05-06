import { Link, Table } from "@/components"
import { type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface UsersTableProps {
	records: Schema.UsersIndex[]
	pagination: Schema.Pagination
	model: string
}

export function UsersTable({ records, pagination, model }: UsersTableProps) {
	const columns: TableColumn<Schema.UsersIndex>[] = [
		{
			accessor: "email",
			title: "Email",
			sortable: true,
			render: (user) => <Link href={ Routes.user(user.id) }>{ user.email }</Link>,
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			textAlign: "right",
			render: (user) => (
				<EditButton href={ Routes.editUser(user.id) } label={ user.person?.name || user.email } />
			),
		},
	]

	return (
		<Table.DataTable
			columns={ columns }
			records={ records }
			pagination={ pagination }
			model={ model }
			selectable
		/>
	)
}
