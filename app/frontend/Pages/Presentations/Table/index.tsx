import React from 'react'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { Table, Link } from '@/Components'
import { EditButton } from '@/Components/Button'
import { type TableProps } from '@/Components/Table/Table'
import { CheckIcon } from '@/Components/Icons'

import cx from 'clsx'
import * as classes from './Table.css'

const PresentationTable = (props: TableProps) => {
	const { params } = usePageProps()

	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="name">Name</Table.Cell>
					<Table.Cell sort="active">Active</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (presentation: Schema.PresentationsIndex) => (
					<Table.Row key={ presentation.slug }>

						<Table.Cell>
							<Link href={ Routes.circleThemePresentation(params.circle_slug, params.theme_slug, presentation.slug) }>{ presentation.name }</Link>
						</Table.Cell>

						<Table.Cell fitContent className={ cx({ [classes.table]: presentation.active }) }>
							{ presentation.active && <CheckIcon /> }
						</Table.Cell>

						<Table.Cell>
							<EditButton href={ Routes.circleThemeEditPresentation(params.circle_slug, params.theme_slug,presentation.slug) } />
						</Table.Cell>

					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default PresentationTable
