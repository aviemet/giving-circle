import React from 'react'
import { Accordion, NavLink } from '@/Components'
import { usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { CircleMenu, PresentationMenu, ThemeMenu } from './menus'
import { Routes } from '@/lib'

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { active_circle, active_theme, active_presentation } = usePageProps()
	const { menuKeys, openMenus, setOpenMenus } = useLayoutStore()
	console.log({ active_theme })
	const handleAccordionChange = (menus: (keyof typeof menuKeys)[]) => {
		setOpenMenus(menus)
	}

	return (
		<Accordion
			multiple
			value={ Array.from(openMenus) }
			onChange={ (menus) => handleAccordionChange(menus as (keyof typeof menuKeys)[]) }
		>
			<NavLink
				href={ Routes.circles() }
				label="Dashboard"
			/>
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
