import { router } from "@inertiajs/react"
import clsx from "clsx"

import { Menu, Box, Group, Divider } from "@/components"
import { TrashIcon } from "@/components/Icons"
import { useTableContext } from "@/components/Table/TableContext"

import * as classes from "../IndexTableTemplate/IndexPage.css"

type MenuOption = {
	label: string
	href: string
	icon?: React.ReactNode
}

export interface IndexTableTitleSectionProps {
	children: React.ReactNode
	contextMenu?: {
		label?: string
		options?: MenuOption[]
		icon?: React.ReactNode
		deleteRoute?: string
	}
}

const IndexTableTitleSection = ({ children, contextMenu }: IndexTableTitleSectionProps) => {
	const { tableState: { selected } } = useTableContext()

	const deleteRecords = () => {
		if(!contextMenu?.deleteRoute) return

		router.visit(contextMenu.deleteRoute, {
			method: "delete",
			data: { ids: Array.from(selected) },
		})
	}

	return (
		<Group justify="space-between" align="start" style={ { marginBottom: 12 } } gap="sm">
			<Group justify="space-between" className={ clsx(classes.title) }>
				{ contextMenu?.options && <Menu position="bottom-end">
					{ contextMenu?.label ? <Menu.Target>{ contextMenu.label }</Menu.Target> : <Menu.Target /> }

					<Menu.Dropdown>
						{ contextMenu.options.map(({ label, href, icon }, index) => {
							return (
								<Menu.Link key={ index } href={ href } leftSection={ icon ? icon : undefined }>
									{ label }
								</Menu.Link>
							)
						}) }

						{ contextMenu?.deleteRoute && selected.size > 0 && <>
							<Divider />

							<Menu.Item leftSection={ <TrashIcon size={ 14 } color="red" /> } onClick={ deleteRecords }>
								Delete
							</Menu.Item>
						</> }

					</Menu.Dropdown>
				</Menu> }
			</Group>
			{ !!children && <Box className={ classes.content }>
				{ children }
			</Box> }
		</Group>
	)
}

export default IndexTableTitleSection
