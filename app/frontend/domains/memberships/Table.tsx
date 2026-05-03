import { Table, Link, Money, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface MembershipTableProps {
	circle: Schema.CirclesInertiaShare
	records: Schema.MembershipsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function MembershipTable({ circle, records, pagination, model }: MembershipTableProps) {
	const columns: TableColumn<Schema.MembershipsIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (membership) => (
				<Link href={ Routes.membership(circle.slug, membership.slug) }>{ membership.name }</Link>
			),
		},
		{
			accessor: "number",
			title: "Number",
			sortable: true,
			render: (membership) => (
				<Link href={ Routes.membership(circle.slug, membership.slug) }>{ membership.number }</Link>
			),
		},
		{
			accessor: "funds_cents",
			title: "Funds",
			sortable: true,
			render: (membership) => (
				<Link href={ Routes.membership(circle.slug, membership.slug) }>
					<Money>{ membership.funds }</Money>
				</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (membership) => (
				<EditButton href={ Routes.editMembership(circle.slug, membership.slug) } />
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
