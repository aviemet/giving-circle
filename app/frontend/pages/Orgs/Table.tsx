import React from "react"

import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

const OrgTable = (props: TableProps) => {
	const { params } = usePageProps<"circleOrgs">()

	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell sort="description">Description</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (org: Schema.OrgsIndex) => {
					if(!params.circle_slug) return <></>

					return (
						<Table.Row key={ org.id }>
							<Table.Cell>
								{ <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.name }</Link> }
							</Table.Cell>
							<Table.Cell>
								{ <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.slug }</Link> }
							</Table.Cell>
							<Table.Cell>
								{ <Link href={ Routes.org(params.circle_slug, org.slug) }>{ org.description }</Link> }
							</Table.Cell>
							<Table.Cell>
								{ <EditButton href={ Routes.editOrg(params.circle_slug, org.slug) } /> }
							</Table.Cell>
						</Table.Row>
					)
				} } />
			</Table.Body>
		</Table>
	)
}

export default OrgTable
