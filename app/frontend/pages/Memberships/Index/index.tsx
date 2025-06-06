import { Page, Group, Card, Stack, Text } from "@/components"
import { NewIcon, UserGroupIcon, CalendarIcon, UploadIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import MembershipsTable from "@/features/memberships/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface MembershipIndexProps {
	memberships: Schema.MembershipsIndex[]
	pagination: Schema.Pagination
}

// @path: /:circle_slug/memberships
// @route: circleMemberships
const MembershipsIndex = ({ memberships, pagination }: MembershipIndexProps) => {
	const { params, active_circle } = usePageProps<"circleMemberships">()
	const title = active_circle ? `${active_circle.name} Members` : "Members"

	const totalFunds = memberships.reduce((sum, m) => sum + m.funds.amount, 0)
	const activeMembers = memberships.filter(m => m.active).length
	const totalMembers = memberships.length

	if(!active_circle) return null

	return (
		<Page title={ title }>
			<Stack gap="lg">
				<Group grow>
					<Card withBorder p="lg" radius="md">
						<Stack gap="xs">
							<Text size="sm" c="dimmed">Total Funds</Text>
							<Group justify="space-between" align="center">
								<Text size="xl" fw={ 600 }>${ totalFunds.toLocaleString() }</Text>
								<UserGroupIcon size={ 24 } />
							</Group>
						</Stack>
					</Card>

					<Card withBorder p="lg" radius="md">
						<Stack gap="xs">
							<Text size="sm" c="dimmed">Active Members</Text>
							<Group justify="space-between" align="center">
								<Text size="xl" fw={ 600 }>{ activeMembers } / { totalMembers }</Text>
								<UserGroupIcon size={ 24 } />
							</Group>
						</Stack>
					</Card>

					<Card withBorder p="lg" radius="md">
						<Stack gap="xs">
							<Text size="sm" c="dimmed">Next Meeting</Text>
							<Group justify="space-between" align="center">
								<Text size="xl" fw={ 600 }>Coming Soon</Text>
								<CalendarIcon size={ 24 } />
							</Group>
						</Stack>
					</Card>
				</Group>

				<Card withBorder radius="md">
					<IndexTableTemplate
						model="memberships"
						rows={ memberships }
						pagination={ pagination }
						searchPlaceholder="Search Members"
						contextMenu={ {
							options: [
								{
									label: "Add New Member",
									href: Routes.newCircleMembership(params.circle_slug),
									icon: <NewIcon size={ 16 } />,
								},
								{
									label: "Export Members",
									icon: <UploadIcon size={ 16 } />,
								},
							],
							deleteRoute: "hi",
						} }
					>
						<MembershipsTable circle={ active_circle } />
					</IndexTableTemplate>
				</Card>
			</Stack>
		</Page>
	)
}

export default MembershipsIndex
