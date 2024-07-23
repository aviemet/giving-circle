import React from 'react'
import { Divider, NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface ThemeMenuProps {
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

const ThemeMenu = ({ circle, theme }: ThemeMenuProps) => {
	return (
		<>
			<NavLink
				href={ Routes.circleTheme(circle.slug, theme.slug) }
				label={ theme.name }
			/>

			<Divider />

			<NavLink
				href={ Routes.circleThemeOrgs(circle.slug, theme.slug) }
				label="Organizations"
			/>
			<NavLink
				href={ Routes.circleThemeMembers(circle.slug, theme.slug) }
				label="Members"
			/>
			<NavLink
				href={ Routes.circleThemePresentations(circle.slug, theme.slug) }
				label="Presentations"
			/>
		</>
	)
}

export default ThemeMenu
