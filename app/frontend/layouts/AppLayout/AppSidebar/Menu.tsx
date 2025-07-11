import { useEffect } from "react"

import { Accordion } from "@/components"
import { usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

import { CircleMenu, PresentationMenu, ThemeMenu } from "./menus"

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { active_circle, active_theme, active_presentation } = usePageProps()
	const { menuKeys, openMenus, setOpenMenus } = useLayoutStore()

	const handleAccordionChange = (menus: (keyof typeof menuKeys)[]) => {
		setOpenMenus(menus)
	}

	// Expand the bottom most menu upon navigation
	useEffect(() => {
		const contextToMenuMap = [
			{ context: active_circle, menuKey: menuKeys.circle },
			{ context: active_theme, menuKey: menuKeys.theme },
			{ context: active_presentation, menuKey: menuKeys.presentation },
		]

		const activeMenus = contextToMenuMap
			.filter(({ context }) => context)
			.map(({ menuKey }) => menuKey)

		if(activeMenus.length > 0) {
			const bottomMostMenu = activeMenus[activeMenus.length - 1]
			setOpenMenus([bottomMostMenu])
		}
	}, [active_circle, active_theme, active_presentation, setOpenMenus, menuKeys])

	return (
		<Accordion
			multiple
			value={ Array.from(openMenus) }
			onChange={ (menus) => handleAccordionChange(menus as (keyof typeof menuKeys)[]) }
		>
			{ active_circle && <>
				<CircleMenu />

				{ active_theme && <>
					<ThemeMenu />

					{ active_presentation && <>
						<PresentationMenu />
					</> }
				</> }
			</>
			}
		</Accordion>
	)
}

export default Menu
