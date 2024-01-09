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
			<NavLink href={ Routes.adminCircleTheme(circle.slug, theme.slug) }>Overview</NavLink>
			<NavLink href={ Routes.adminCircleThemeOrgs(circle.slug, theme.slug) }>Organizations</NavLink>
			<NavLink href={ Routes.adminCircleThemeMembers(circle.slug, theme.slug) }>Members</NavLink>
			<NavLink href={ Routes.adminCircleThemePresentations(circle.slug, theme.slug) }>Presentations</NavLink>
		</>
	)
}

export default ThemeMenu
