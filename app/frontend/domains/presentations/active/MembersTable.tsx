import { useTranslation } from "react-i18next"

import { Menu, Money, Table, type TableColumn } from "@/components"
import { NumberInput } from "@/components/Inputs"
import { Routes } from "@/lib"
import { useUpdateInteractionMembershipVotes } from "@/queries"

interface MembersTableProps {
	circleSlug: string
	presentationSlug: string
	finalistInteractionSlug?: string | null
	records: Schema.PresentationsActiveMember[]
}

function VotesCell({
	member,
	onSave,
}: {
	member: Schema.PresentationsActiveMember
	onSave: (membershipId: string, votes: number) => void
}) {
	const membershipId = member.finalist_interaction_membership_id
	if(membershipId === undefined || membershipId === null || membershipId === "") {
		return null
	}

	return (
		<NumberInput
			wrapper={ false }
			min={ 0 }
			defaultValue={ member.finalist_votes ?? 0 }
			onBlur={ (event) => {
				const next = Number(event.currentTarget.value)
				if(!Number.isFinite(next)) return

				onSave(membershipId, Math.round(next))
			} }
		/>
	)
}

export function MembersTable({
	circleSlug,
	presentationSlug,
	finalistInteractionSlug,
	records,
}: MembersTableProps) {
	const { t } = useTranslation()
	const updateVotes = useUpdateInteractionMembershipVotes({
		params: {
			circleSlug,
			presentationSlug,
			interactionSlug: finalistInteractionSlug ?? "",
		},
	})

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
			render: (member) => (
				<VotesCell
					member={ member }
					onSave={ (membershipId, votes) => {
						updateVotes.mutate({ membershipId, votes })
					} }
				/>
			),
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
