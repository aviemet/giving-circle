import { Table, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface PresentationSlideTableProps {
	records: Schema.SlidesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function PresentationSlideTable({ records, pagination, model }: PresentationSlideTableProps) {
	const { params } = usePageProps<"themePresentationSlides">()

	const columns: TableColumn<Schema.SlidesIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (slide) => slide.title ?? slide.slug,
		},
		{
			accessor: "data",
			title: "Data",
			sortable: true,
			render: (slide) => JSON.stringify(slide.data),
		},
		{
			accessor: "order",
			title: "Order",
			sortable: true,
			render: () => "",
		},
		{
			accessor: "template",
			title: "Template",
			sortable: true,
			render: () => "",
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (slide) => (
				<EditButton
					href={ Routes.editThemePresentationSlide(
						params.circle_slug,
						params.theme_slug,
						params.presentation_slug,
						slide.slug,
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
