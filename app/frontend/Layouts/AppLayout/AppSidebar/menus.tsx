import React from 'react'
import { Link } from '@/Components'
import { Routes } from '@/lib'

const circleMenu = (circle: Schema.Circle) => [
	<Link key={ 0 } href={ Routes.adminCircle(circle.slug) }>Overview</Link>,
	<Link key={ 1 } href={ Routes.adminCircleThemes(circle.slug) }>Themes</Link>,
	<Link key={ 2 } href={ Routes.adminCircleMembers(circle.slug) }>Members</Link>,
]

const themeMenu = (circle: Schema.Circle, theme: Schema.Theme) => [
	<Link key={ 0 } href={ Routes.adminCircleTheme(circle.slug, theme.slug) }>Overview</Link>,
	<Link key={ 1 } href={ Routes.adminCircleThemeOrgs(circle.slug, theme.slug) }>Organizations</Link>,
	<Link key={ 2 } href={ Routes.adminCircleThemeMembers(circle.slug, theme.slug) }>Members</Link>,
	<Link key={ 3 } href={ Routes.adminCircleThemePresentations(circle.slug, theme.slug) }>Presentations</Link>,
]

export { circleMenu, themeMenu }
