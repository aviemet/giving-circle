import React from 'react'
import { Accordion } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { CircleMenu, PresentationMenu, ThemeMenu } from './menus'

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { menu } = usePageProps()
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
