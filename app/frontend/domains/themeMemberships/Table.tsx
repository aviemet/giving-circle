import { Table, Link } from "@/components"
import { type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface ThemeMembershipsTableProps {
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
	records: Schema.MembershipsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function ThemeMembershipsTable({ circle, theme, records, pagination, model }: ThemeMembershipsTableProps) {
	const columns: TableColumn<Schema.MembershipsIndex>[] = [
		{
			accessor: "person.first_name",
			title: "First name",
			sortable: true,
			render: (membership) => (
				<Link href={ Routes.membership(circle.slug, membership.slug) }>
					{ membership.person.first_name }
				</Link>
			),
		},
		{
			accessor: "person.last_name",
			title: "Last name",
			sortable: true,
			render: (membership) => (
				<Link href={ Routes.membership(circle.slug, membership.slug) }>
					{ membership.person.last_name }
				</Link>
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
