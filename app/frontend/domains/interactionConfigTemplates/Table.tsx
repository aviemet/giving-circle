import { useTranslation } from "react-i18next"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface InteractionConfigTemplatesTableProps {
	records: Schema.InteractionConfigTemplatesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function InteractionConfigTemplatesTable({
	records,
	pagination,
	model,
}: InteractionConfigTemplatesTableProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"circleInteractionTemplates">()

	const columns: TableColumn<Schema.InteractionConfigTemplatesIndex>[] = [
		{
			accessor: "name",
			title: t("interaction_config_templates.index.columns.name"),
			sortable: true,
			render: (row) => (
				<Link href={ Routes.editCircleInteractionTemplate(params.circle_slug, row.slug) }>
					{ row.name }
				</Link>
			),
		},
		{
			accessor: "actions",
			title: t("interaction_config_templates.index.columns.actions"),
			sortable: false,
			render: (row) => (
				<EditButton href={ Routes.editCircleInteractionTemplate(params.circle_slug, row.slug) } />
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
