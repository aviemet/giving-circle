import { useMemo } from "react"
import { useTranslation } from "react-i18next"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationInteractionsTableProps {
	records: Schema.PresentationInteractionsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationInteractionsTable({ records, pagination, model }: PresentationInteractionsTableProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"themePresentationInteractions">()

	const columns: TableColumn<Schema.PresentationInteractionsIndex>[] = useMemo(() => [
		{
			accessor: "name",
			title: t("presentations.interactions.table.name"),
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.name }
				</Link>
			),
		},
		{
			accessor: "trigger_type",
			title: t("presentations.interactions.table.trigger"),
			sortable: true,
			render: (row) => row.trigger_type,
		},
		{
			accessor: "actions",
			title: t("presentations.interactions.table.actions"),
			sortable: false,
			render: (row) => (
				<EditButton
					href={ Routes.editThemePresentationInteraction(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						row.slug,
					) }
				/>
			),
		},
	], [params.circle_slug, params.presentation_slug, params.theme_slug])

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
