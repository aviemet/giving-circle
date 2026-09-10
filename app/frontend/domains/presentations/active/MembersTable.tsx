import { useTranslation } from "react-i18next"

import { Menu, Money, Table, type TableColumn } from "@/components"
import { Routes } from "@/lib"

interface MembersTableProps {
	circleSlug: string
	presentationSlug: string
	finalistInteractionSlug?: string | null
	records: Schema.PresentationsActiveMember[]
}

export function MembersTable({
	circleSlug,
	presentationSlug,
	finalistInteractionSlug,
	records,
}: MembersTableProps) {
	const { t } = useTranslation()

	const columns: TableColumn<Schema.PresentationsActiveMember>[] = [
		{
			accessor: "name",
			title: t("presentations.active.members.columns.name"),
			sortable: false,
		},
		{
			accessor: "number",
			title: t("presentations.active.members.columns.number"),
			sortable: false,
		},
		{
			accessor: "funds",
			title: t("presentations.active.members.columns.funds"),
			sortable: false,
			render: (member) => (
				member.funds ? <Money>{ member.funds }</Money> : null
			),
		},
		{
			accessor: "presentation_funds",
			title: t("presentations.active.members.columns.available"),
			sortable: false,
			render: (member) => (
				member.presentation_funds ? <Money>{ member.presentation_funds }</Money> : null
			),
		},
	]

	if(finalistInteractionSlug) {
		columns.push({
			accessor: "finalist_votes",
			title: t("presentations.active.members.columns.votes"),
			sortable: false,
		})
	}

	columns.push(
		{
			accessor: "email",
			title: t("presentations.active.members.columns.email"),
			sortable: false,
			render: (member) => member.email ?? "",
		},
		{
			accessor: "actions",
			title: t("presentations.active.members.columns.actions"),
			sortable: false,
			render: () => (
				<Menu position="bottom-end">
					<Menu.Target />
					<Menu.Dropdown>
						<Menu.Link
							href={ Routes.circlePresentationInteract(circleSlug, presentationSlug) }
							target="_blank"
						>
							{ t("presentations.active.members.actions.interactions") }
						</Menu.Link>
					</Menu.Dropdown>
				</Menu>
			),
		},
	)

	return (
		<Table.DataTable
			columns={ columns }
			records={ records }
			model="members"
		/>
	)
}
