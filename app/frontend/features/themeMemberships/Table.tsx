import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

interface MembershipTableProps extends TableProps {
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

const MembershipTable = ({ circle, theme, ...props }: MembershipTableProps) => {
	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="first_name">First_name</Table.Cell>
					<Table.Cell sort="last_name">Last_name</Table.Cell>
					<Table.Cell sort="number">Number</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (membership: Schema.MembershipsIndex) => (
					<Table.Row key={ membership.id }>
						<Table.Cell>
							<Link href={ Routes.themeMembership(circle.slug, theme.slug, membership.slug) }>{ membership.person.first_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.themeMembership(circle.slug, theme.slug, membership.slug) }>{ membership.person.last_name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.themeMembership(circle.slug, theme.slug, membership.slug) }>{ membership.number }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editThemeMembership(circle.slug, theme.slug, membership.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default MembershipTable
