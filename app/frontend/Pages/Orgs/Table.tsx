import React from 'react'
import { Routes } from '@/lib'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type ITableProps } from '@/Components/Table/Table'
import { usePageProps } from '@/lib/hooks'

const OrgTable = (props: ITableProps) => {
	const { params } = usePageProps()

	return (
		<Table>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell sort="description">Description</Table.Cell>
					<Table.Cell className="actions">Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (org: Schema.OrgsIndex) => (
					<Table.Row key={ org.id }>
						<Table.Cell>
							<Link href={ Routes.adminCircleThemeOrg(params.circle_slug, params.theme_slug, org.slug) }>{ org.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.adminCircleThemeOrg(params.circle_slug, params.theme_slug, org.slug) }>{ org.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.adminCircleThemeOrg(params.circle_slug, params.theme_slug, org.slug) }>{ org.description }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editAdminCircleThemeOrg(params.circle_slug, params.theme_slug, org.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default OrgTable
