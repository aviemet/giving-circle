import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

type PresentationInteractionRow = {
	id: string
	slug: string
	action_type: string
	config: string
	results: string
	trigger_type: string
	trigger_conditions: string
}

interface PresentationActionTableProps {
	records: PresentationInteractionRow[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationActionTable({ records, pagination, model }: PresentationActionTableProps) {
	const { params } = usePageProps<"themePresentationInteractions">()

	const columns: TableColumn<PresentationInteractionRow>[] = [
		{
			accessor: "slug",
			title: "Slug",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.slug }
				</Link>
			),
		},
		{
			accessor: "action_type",
			title: "Action type",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.action_type }
				</Link>
			),
		},
		{
			accessor: "config",
			title: "Config",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.config }
				</Link>
			),
		},
		{
			accessor: "results",
			title: "Results",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.results }
				</Link>
			),
		},
		{
			accessor: "trigger_type",
			title: "Trigger type",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.trigger_type }
				</Link>
			),
		},
		{
			accessor: "trigger_conditions",
			title: "Trigger conditions",
			sortable: true,
			render: (row) => (
				<Link href={ Routes.themePresentationInteraction(
					params.circle_slug,
					params.theme_slug,
					params.presentation_slug,
					row.slug,
				) }
				>
					{ row.trigger_conditions }
				</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
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
