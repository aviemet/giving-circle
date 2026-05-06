import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface CircleTableProps {
	records: Schema.CirclesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function CircleTable({ records, pagination, model }: CircleTableProps) {
	const columns: TableColumn<Schema.CirclesIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (circle) => <Link href={ Routes.circle(circle.id) }>{ circle.name }</Link>,
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (circle) => <EditButton href={ Routes.editCircle(circle.id) } />,
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
