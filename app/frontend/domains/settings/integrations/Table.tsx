import { useTranslation } from "react-i18next"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { CheckIcon, CrossIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface IntegrationsTableProps {
	records: Schema.IntegrationsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function IntegrationsTable({
	records,
	pagination,
	model,
}: IntegrationsTableProps) {
	const { t } = useTranslation()
	const { params } = usePageProps<"settingsIntegrations">()

	const columns: TableColumn<Schema.IntegrationsIndex>[] = [
		{
			accessor: "name",
			title: t("integrations.index.columns.name"),
			sortable: true,
			render: (row) => (
				<Link href={ Routes.editSettingsIntegration(params.circle_slug, row.id) }>
					{ row.name }
				</Link>
			),
		},
		{
			accessor: "provider",
			title: t("integrations.index.columns.provider"),
			sortable: true,
		},
		{
			accessor: "medium",
			title: t("integrations.index.columns.medium"),
			sortable: true,
		},
		{
			accessor: "active",
			title: t("integrations.index.columns.active"),
			sortable: true,
			render: (row) => {
				if(row.active) {
					return (
						<span aria-label={ t("integrations.index.active_yes") }>
							<CheckIcon color="var(--mantine-color-green-6)" aria-hidden />
						</span>
					)
				}

				return (
					<span aria-label={ t("integrations.index.active_no") }>
						<CrossIcon color="var(--mantine-color-red-6)" aria-hidden />
					</span>
				)
			},
		},
		{
			accessor: "actions",
			title: t("integrations.index.columns.actions"),
			sortable: false,
			render: (row) => (
				<EditButton href={ Routes.editSettingsIntegration(params.circle_slug, row.id) } />
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
