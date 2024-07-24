import React, { useEffect } from 'react'
import { Accordion, NavLink } from '@/Components'
import { Routes } from '@/lib'
import { useInit, usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { params, menu } = usePageProps()
	const { menuKeys, openMenus, toggleOpenMenu, setOpenMenus } = useLayoutStore()

	useEffect(() => {
		if(openMenus.has('theme') && !params?.theme_slug) {
			toggleOpenMenu('theme', false)
		}
	}, [params])

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
				<Accordion.Item key={ menuKeys.circle } value={ menuKeys.circle }>
					<Accordion.Control>{ menu.active_circle.name }</Accordion.Control>
					<Accordion.Panel>
						<NavLink
							href={ Routes.circle(menu.active_circle.slug) }
							label="Dashboard"
						/>
						<NavLink
							href={ Routes.circleThemes(menu.active_circle.slug) }
							label="Themes"
						/>
						<NavLink
							href={ Routes.circleMembers(menu.active_circle.slug) }
							label="Members"
						/>
						<NavLink
							href={ Routes.circlePresentationTemplates(menu.active_circle.slug) }
							label="Presentation Templates"
						/>
					</Accordion.Panel>
				</Accordion.Item>

				{ menu.active_theme && (
					<Accordion.Item key={ menuKeys.theme } value={ menuKeys.theme }>
						<Accordion.Control>{ menu.active_theme.name }</Accordion.Control>
						<Accordion.Panel>
							<NavLink
								href={ Routes.circleTheme(menu.active_circle.slug, menu.active_theme.slug) }
								label="Overview"
							/>

							<NavLink
								href={ Routes.circleThemeOrgs(menu.active_circle.slug, menu.active_theme.slug) }
								label="Organizations"
							/>
							<NavLink
								href={ Routes.circleThemeMembers(menu.active_circle.slug, menu.active_theme.slug) }
								label="Members"
							/>
							<NavLink
								href={ Routes.circleThemePresentations(menu.active_circle.slug, menu.active_theme.slug) }
								label="Presentations"
							/>
						</Accordion.Panel>
					</Accordion.Item>
				) }
			</> }
		</Accordion>
	)
}

export default Menu
