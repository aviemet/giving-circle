import { Group, Link, Table, type TableColumn } from "@/components"
import { EditButton } from "@/components/Button"

interface SmtpListProps {
	smtps: Schema.SmtpsIndex[]
}

function mailRecordPath(id: string) {
	return `/settings/mail/${id}`
}

function mailEditPath(id: string) {
	return `/settings/mail/${id}/edit`
}

const SmtpList = ({ smtps }: SmtpListProps) => {
	const columns: TableColumn<Schema.SmtpsIndex>[] = [
		{
			accessor: "name",
			title: "Name",
			sortable: false,
			render: (smtp) => <Link href={ mailRecordPath(smtp.id) }>{ smtp.name }</Link>,
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
					<EditButton href={ mailEditPath(smtp.id) } label={ smtp.name } />
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

export default SmtpList
