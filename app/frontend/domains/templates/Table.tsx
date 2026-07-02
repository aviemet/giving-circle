import { Button, Group, Table, Link, Text, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { NewIcon } from "@/components/Icons"
import { Routes } from "@/lib"

import { CreatePresentationFromTemplateButton } from "./CreatePresentationFromTemplateModal"
import { NewTemplateModal } from "./NewTemplateModal"

interface TemplatesTableProps {
	circle: Schema.CirclesOptions & { slug: string }
	themes: Schema.ThemesIndex[]
	records: Schema.TemplatesIndex[]
	pagination: Schema.Pagination
	model: string
}

export function TemplatesTable({
	circle,
	themes,
	records,
	pagination,
	model,
}: TemplatesTableProps) {
	const emptyState = circle.slug
		? (
			<>
				<Text>{ circle.name || "This circle" } doesn&apos;t have any saved presentation templates</Text>
				<NewTemplateModal circle={ circle }><Button px="sm"><NewIcon /> Create One</Button></NewTemplateModal>
			</>
		)
		: undefined

	const columns: TableColumn<Schema.TemplatesIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (template) => (
				<Link href={ Routes.circleTemplate(template.circle.slug, template.slug) }>{ template.name }</Link>
			),
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (template) => (
				<Group gap="xs" wrap="nowrap">
					<CreatePresentationFromTemplateButton
						template={ template }
						themes={ themes }
						circleSlug={ circle.slug }
					/>
					<EditButton
						href={ Routes.editCircleTemplate(template.circle.slug, template.slug) }
						label={ template.name }
					/>
				</Group>
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
			emptyState={ emptyState }
		/>
	)
}
