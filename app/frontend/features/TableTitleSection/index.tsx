import { router } from "@inertiajs/react"
import clsx from "clsx"

import { Menu, Group, Divider, Button, Link } from "@/components"
import { TrashIcon, DotsIcon } from "@/components/Icons"
import { useTableContext } from "@/components/Table/TableContext"

import * as classes from "../IndexTableTemplate/IndexPage.css"

type MenuOption = {
	label: string
	href?: string
	icon?: React.ReactNode
	onClick?: () => void
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
		<Group justify="space-between" align="center" style={ { marginBottom: 12 } } gap="sm">
			<Group className={ clsx(classes.content) }>
				{ children }
			</Group>
			{ contextMenu?.options && <Menu position="bottom-end">
				<Menu.Target>
					<Button
						variant="filled"
						radius="xl"
						rightSection={ <DotsIcon size={ 16 } /> }
					>
						{ contextMenu.label || "Actions" }
					</Button>
				</Menu.Target>

				<Menu.Dropdown>
					{ contextMenu.options.map(({ label, icon, href, onClick }, index) => {
						if(typeof href === "string") {
							return (
								<Menu.Link
									key={ index }
									leftSection={ icon }
									component={ Link }
									href={ href }
								>
									{ label }
								</Menu.Link>
							)
						}

						return (
							<Menu.Item
								key={ index }
								leftSection={ icon }
								component="button"
								onClick={ onClick }
							>
								{ label }
							</Menu.Item>
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
	)
}

export default IndexTableTitleSection
