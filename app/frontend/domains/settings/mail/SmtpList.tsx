import { Group, Link, Table, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"
import { Routes } from "@/lib"

interface SmtpListProps {
	smtps: Schema.SmtpsIndex[]
	circleSlug: string | undefined
}

function mailRouteOptions(circleSlug: string) {
	return { circle_slug: circleSlug }
}

export function SmtpList({ smtps, circleSlug }: SmtpListProps) {
	if(!circleSlug) return null

	const routeOptions = mailRouteOptions(circleSlug)

	const columns: TableColumn<Schema.SmtpsIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: false,
			render: (smtp) => <Link href={ Routes.settingsSmtp(smtp.id, routeOptions) }>{ smtp.name }</Link>,
		},
		{
			accessor: "domain",
			title: "Host",
			sortable: false,
			render: (smtp) => smtp.domain,
		},
		{
			accessor: "username",
			title: "Username",
			sortable: false,
			render: (smtp) => smtp.username,
		},
		{
			accessor: "actions",
			title: "Actions",
			sortable: false,
			render: (smtp) => (
				<Group gap="sm">
					<EditButton href={ Routes.editSettingsSmtp(smtp.id, routeOptions) } label={ smtp.name } />
				</Group>
			),
		},
	]

	return (
		<Table.TableProvider model="smtp" selectable>
			<Table.DataTable columns={ columns } records={ smtps } selectable />
		</Table.TableProvider>
	)
}
