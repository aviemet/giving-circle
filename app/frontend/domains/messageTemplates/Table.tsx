import { useTranslation } from "react-i18next"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface MessageTemplatesTableProps {
	records: Schema.MessageTemplatesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function MessageTemplatesTable({
	records,
	pagination,
	model,
}: MessageTemplatesTableProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"settingsMessageTemplates">()

	const columns: TableColumn<Schema.MessageTemplatesIndex>[] = [
		{
			accessor: "name",
			title: t("message_templates.index.columns.name"),
			sortable: true,
			render: (row) => (
				<Link href={ Routes.editSettingsMessageTemplate(params.circle_slug, row.slug) }>
					{ row.name }
				</Link>
			),
		},
		{
			accessor: "medium",
			title: t("message_templates.index.columns.medium"),
			sortable: true,
		},
		{
			accessor: "actions",
			title: t("message_templates.index.columns.actions"),
			sortable: false,
			render: (row) => (
				<EditButton href={ Routes.editSettingsMessageTemplate(params.circle_slug, row.slug) } />
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
