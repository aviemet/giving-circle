import { Table, Link, Money } from "@/components"
import { type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface ThemeOrgTableProps {
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
	records: Schema.ThemesOrgsShow[]
	pagination: Schema.Pagination
	model: string
}

export function ThemeOrgTable({ theme, circle, records, pagination, model }: ThemeOrgTableProps) {
	const columns: TableColumn<Schema.ThemesOrgsShow>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (org) => (
				<Link href={ Routes.themeOrg(circle.slug, theme.slug, org.slug) }>{ org.name }</Link>
			),
		},
		{
			accessor: "ask",
			title: "Ask",
			sortable: true,
			render: (org) => (
				<Link href={ Routes.themeOrg(circle.slug, theme.slug, org.slug) }>
					<Money>{ org.ask }</Money>
				</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (org) => <EditButton href={ Routes.editThemeOrg(circle.slug, theme.slug, org.slug) } />,
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
