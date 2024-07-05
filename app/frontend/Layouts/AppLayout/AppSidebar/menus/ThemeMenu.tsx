import React from 'react'
import { NavLink } from '@/Components'
import { Routes } from '@/lib'

export interface ThemeMenuProps {
	circle: Schema.CirclesShare
	theme: Schema.ThemesShallow
}

const ThemeMenu = ({ circle, theme }: ThemeMenuProps) => {
	return (
		<>
			<NavLink
				href={ Routes.circleTheme(circle.slug, theme.slug) }
				label="Overview"
			/>
			<NavLink
				href={ Routes.circleThemeOrgs(circle.slug, theme.slug) }
				label="Organizations"
			/>
			<NavLink
				href={ Routes.circleThemeMembers(circle.slug, theme.slug) }
				label="Members"
			/>
			<NavLink
				href={ Routes.themePresentations(theme.slug) }
				label="Presentations"
			/>
		</>
	)
}

export default ThemeMenu
