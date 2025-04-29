import React from 'react'
import { Routes } from '@/lib'
import { Table, Link, Money } from '@/components'
import { EditButton } from '@/components/Button'
import { type TableProps } from '@/components/Table/Table'

interface MembershipTableProps extends TableProps {
	circle: Schema.CirclesInertiaShare
}

const MembershipTable = ({ circle, ...props }: MembershipTableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="number">Number</Table.Cell>
					<Table.Cell sort="funds_cents">Funds</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (membership: Schema.MembershipsIndex) => (
					<Table.Row key={ membership.id }>

						<Table.Cell>
							<Link href={ Routes.membership(circle.slug, membership.slug) }>
								{ membership.name }
							</Link>
						</Table.Cell>

						<Table.Cell>
							<Link href={ Routes.membership(circle.slug, membership.slug) }>
								{ membership.number }
							</Link>
						</Table.Cell>

						<Table.Cell>
							<Link href={ Routes.membership(circle.slug, membership.slug) }>
								<Money>{ membership.funds }</Money>
							</Link>
						</Table.Cell>


						<Table.Cell>
							<EditButton href={ Routes.editMembership(circle.slug, membership.slug) } />
						</Table.Cell>

					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default MembershipTable
