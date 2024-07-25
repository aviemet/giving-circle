import React from 'react'
import { Accordion, NavLink } from '@/Components'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { useLayoutStore } from '@/Store'
import { isEmpty } from 'lodash'

const ThemeMenu = () => {
	const { menu } = usePageProps()
	const { menuKeys } = useLayoutStore()

	if(isEmpty(menu.active_circle) || isEmpty(menu.active_theme)) return <></>

	return (
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
	)
}

export default ThemeMenu
