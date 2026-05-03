import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

type PresentationInteractionResponseRow = {
	id: string
	slug: string
	response_data: string
}

interface PresentationActionResponseTableProps {
	records: PresentationInteractionResponseRow[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationActionResponseTable({
	records,
	pagination,
	model,
}: PresentationActionResponseTableProps) {
	const { params } = usePageProps<"themePresentationInteractionResponses">()

	const columns: TableColumn<PresentationInteractionResponseRow>[] = [
		{
			accessor: "response_data",
			title: "Response data",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteractionResponse(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.response_data }
				</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (row) => (
				<EditButton
					href={ Routes.editThemePresentationInteractionResponse(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						row.slug,
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
