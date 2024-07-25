import React, { useEffect } from 'react'
import { Accordion } from '@/Components'
import { usePageProps, usePrevious } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { CircleMenu, PresentationMenu, ThemeMenu } from './menus'

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { menu } = usePageProps()
	const { menuKeys, openMenus, setOpenMenus, toggleOpenMenu } = useLayoutStore()

	useEffect(() => {
		if(!menu.active_presentation && openMenus.has(menuKeys.presentation)) {
			toggleOpenMenu(menuKeys.presentation, false)
		}
		if(!menu.active_theme && openMenus.has(menuKeys.theme)) {
			toggleOpenMenu(menuKeys.theme, false)
		}
		if(!menu.active_circle && openMenus.has(menuKeys.circle)) {
			toggleOpenMenu(menuKeys.circle, false)
		}
	}, [openMenus])

	const prevMenus = usePrevious(openMenus)
	console.log({ openMenus, prevMenus })
	const handleAccordionChange = (menus: (keyof typeof menuKeys)[]) => {
		setOpenMenus(menus)
	}

	return (
		<Accordion
			multiple
			value={ Array.from(openMenus) }
			onChange={ (menus) => handleAccordionChange(menus as (keyof typeof menuKeys)[]) }
		>
			{ menu.active_circle && <>
				<CircleMenu />

				{ menu.active_theme && <>
					<ThemeMenu />

					{ menu.active_presentation && <>
						<PresentationMenu />
					</> }
				</> }
			</>
			}
		</Accordion>
	)
}

export default Menu
