import clsx from "clsx"

import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { CheckIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import * as classes from "./Table.css"

interface PresentationTableProps {
	records: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationTable({ records, pagination, model }: PresentationTableProps) {
	const { params } = usePageProps<"themePresentations">()

	const columns: TableColumn<Schema.PresentationsIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (presentation) => (
				<Link href={ Routes.themePresentation(params.circle_slug, params.theme_slug, presentation.slug) }>
					{ presentation.name }
				</Link>
			),
		},
		{
			accessor: "active",
			title: "Active",
			sortable: true,
			render: (presentation) => (
				<div className={ clsx({ [classes.table]: presentation.active }) }>
					{ presentation.active && <CheckIcon /> }
				</div>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (presentation) => (
				<EditButton
					href={ Routes.editThemePresentation(params.circle_slug, params.theme_slug, presentation.slug) }
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
