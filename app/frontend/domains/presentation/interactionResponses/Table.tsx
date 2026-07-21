import { useTranslation } from "react-i18next"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationInteractionResponsesTableProps {
	records: Schema.PresentationInteractionResponsesIndex[]
	pagination: Schema.Pagination
	model: string
}

function totalAllocatedCents(responseData: Schema.PresentationInteractionResponsesIndex["response_data"]): number {
	const allocations = responseData?.allocations
	if(!Array.isArray(allocations)) return 0

	return allocations.reduce((sum, entry) => sum + (entry.amount_cents ?? 0), 0)
}

export function PresentationInteractionResponsesTable({
	records,
	pagination,
	model,
}: PresentationInteractionResponsesTableProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteractionResponses">()

	const columns: TableColumn<Schema.PresentationInteractionResponsesIndex>[] = [
		{
			accessor: "membership",
			title: t("presentations.interaction_responses.table.member"),
			render: (row) => (
				<Link href={ Routes.themePresentationInteractionResponse(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					params.interaction_slug,
					row.id,
				) }
				>
					{ row.membership.name }
				</Link>
			),
		},
		{
			accessor: "response_data",
			title: t("presentations.interaction_responses.table.total_allocated"),
			render: (row) => totalAllocatedCents(row.response_data),
		},
		{
			accessor: "actions",
			title: t("presentations.interaction_responses.table.actions"),
			sortable: false,
			render: (row) => (
				<EditButton
					href={ Routes.editThemePresentationInteractionResponse(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						params.interaction_slug,
						row.id,
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
