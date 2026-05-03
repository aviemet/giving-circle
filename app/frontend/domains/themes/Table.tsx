import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ThemesTableProps {
	records: Schema.ThemesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function ThemesTable({ records, pagination, model }: ThemesTableProps) {
	const { params } = usePageProps<"circleThemes">()

	const columns: TableColumn<Schema.ThemesIndex>[] = [
		{
			accessor: "name",
			title: "Title",
			sortable: true,
			render: (theme) => <Link href={ Routes.theme(params.circle_slug, theme.slug) }>{ theme.name }</Link>,
		},
		{
			accessor: "slug",
			title: "Slug",
			sortable: true,
			render: (theme) => <Link href={ Routes.theme(params.circle_slug, theme.slug) }>{ theme.slug }</Link>,
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (theme) => <EditButton href={ Routes.editTheme(params.circle_slug, theme.slug) } />,
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
