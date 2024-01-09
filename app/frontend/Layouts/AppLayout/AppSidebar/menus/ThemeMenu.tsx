import React from 'react'
import { NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface ThemeMenuProps {
	circle: Schema.Circle
	theme: Schema.Theme
}

const ThemeMenu = ({ circle, theme }: ThemeMenuProps) => {
	return (
		<>
			<NavLink
				href={ Routes.adminCircleTheme(circle.slug, theme.slug) }
				label="Overview"
			/>
			<NavLink
				href={ Routes.adminCircleThemeOrgs(circle.slug, theme.slug) }
				label="Organizations"
			/>
			<NavLink
				href={ Routes.adminCircleThemeMembers(circle.slug, theme.slug) }
				label="Members"
			/>
			<NavLink
				href={ Routes.adminCircleThemePresentations(circle.slug, theme.slug) }
				label="Presentations"
			/>
		</>
	)
}

export default ThemeMenu
