import { Table, Link, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface OrgTableProps {
	records: Schema.OrgsIndex[]
	pagination: Schema.Pagination
	model: string
}

export function OrgTable({ records, pagination, model }: OrgTableProps) {
	const { params } = usePageProps<"circleOrgs">()

	const columns: TableColumn<Schema.OrgsIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: true,
			render: (org) => {
				if(!params.circle_slug) return org.name

				return <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.name }</Link>
			},
		},
		{
			accessor: "slug",
			title: "Slug",
			sortable: true,
			render: (org) => {
				if(!params.circle_slug) return org.slug

				return <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.slug }</Link>
			},
		},
		{
			accessor: "description",
			title: "Description",
			sortable: true,
			render: (org) => {
				if(!params.circle_slug) return org.description

				return <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.description }</Link>
			},
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (org) => {
				if(!params.circle_slug) return null

				return <EditButton href={ Routes.editOrg(params.circle_slug, org.slug) } />
			},
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
