import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationElementsTableProps {
	records: Schema.PresentationElementsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationElementsTable({ records, pagination, model }: PresentationElementsTableProps) {
	const { params } = usePageProps<"themePresentationsElements">()

	const columns: TableColumn<Schema.PresentationElementsIndex>[] = [
		{
			accessor: "data",
			title: "Data",
			sortable: true,
			render: (presentation_element) => (
				<Link href={ Routes.themePresentationElement(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					presentation_element.slug,
				) }
				>
					{ JSON.stringify(presentation_element.data) }
				</Link>
			),
		},
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (presentation_element) => (
				<Link href={ Routes.themePresentationElement(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					presentation_element.slug,
				) }
				>
					{ presentation_element.name }
				</Link>
			),
		},
		{
			accessor: "template",
			title: "Template",
			sortable: true,
			render: (presentation_element) => (
				<Link href={ Routes.themePresentationElement(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					presentation_element.slug,
				) }
				>
					{ String(presentation_element.template) }
				</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (presentation_element) => (
				<EditButton
					href={ Routes.editThemePresentationElement(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						presentation_element.slug,
					) }
				/>
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
