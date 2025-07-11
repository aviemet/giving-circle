import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
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
