import React from 'react'
import { useTableContext } from '@/Components/Table/TableContext'
import { Box, Group, Divider } from '@mantine/core'
import { Menu } from '@/Components'
import { TrashIcon } from '@/Components/Icons'
import { router } from '@inertiajs/react'

import cx from 'clsx'
import * as classes from '../IndexPageTemplate/IndexPage.css'

export interface IndexTableTitleSectionProps {
	children: React.ReactNode
	deleteRoute?: string
	menuLabel?: React.ReactNode
	menuOptions?: {
		label: string
		href: string
		icon?: React.ReactNode
	}[]
}

const IndexTableTitleSection = ({ children, deleteRoute, menuLabel,menuOptions }: IndexTableTitleSectionProps) => {
	const { tableState: { selected } } = useTableContext()

	const deleteRecords = () => {
		if(!deleteRoute) return

		router.visit(deleteRoute, {
			method: 'delete',
			data: { ids: Array.from(selected) },
		})
	}

	return (
		<Group justify="space-between" align="start" style={ { marginBottom: 12 } } gap="sm">
			<Group justify="space-between" className={ cx(classes.title) }>
				<Menu position="bottom-end">
					{ menuLabel ? <Menu.Target>{ menuLabel }</Menu.Target> : <Menu.Target /> }

					<Menu.Dropdown>
						{ menuOptions && menuOptions.map(({ label, href, icon }, index) => {
							return (
								<Menu.Link key={ index } href={ href } leftSection={ icon ? icon : undefined }>
									{ label }
								</Menu.Link>
							)
						}) }

						{ deleteRoute && selected.size > 0 && <>
							<Divider />

							<Menu.Item leftSection={ <TrashIcon size={ 14 } color='red' /> } onClick={ deleteRecords }>
								Delete
							</Menu.Item>
						</> }

					</Menu.Dropdown>
				</Menu>
			</Group>
			{ !!children && <Box className={ classes.content }>
				{ children }
			</Box> }
		</Group>
	)
}

export default IndexTableTitleSection
