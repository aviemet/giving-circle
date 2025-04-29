import React from "react"

import { Table, Link, Money } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"

interface ThemeOrgTableProps extends TableProps {
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
}

const ThemeOrgTable = ({ theme, circle, ...props }: ThemeOrgTableProps) => {
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="slug">Ask</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (org: Schema.ThemesOrgsShow) => (
					<Table.Row key={ org.id }>
						<Table.Cell nowrap>
							<Link href={ Routes.themeOrg(circle.slug, theme.slug, org.slug) }>
								{ org.name }
							</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.themeOrg(circle.slug, theme.slug, org.slug) }>
								<Money>{ org.ask }</Money>
							</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editThemeOrg(circle.slug, theme.slug, org.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default ThemeOrgTable
