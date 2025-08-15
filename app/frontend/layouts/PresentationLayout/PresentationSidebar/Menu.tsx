import { useEffect } from "react"

import { Accordion, Divider, NavLink } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

const Menu = () => {
	const { active_circle, active_theme, active_presentation } = usePageProps()

	return (
		<>{ active_circle && active_theme && active_presentation && <>
			<NavLink href={ Routes.themePresentationOverview(active_circle.slug, active_theme.slug, active_presentation.slug) }>Overview</NavLink>
			<NavLink href="">Members</NavLink>

			<Divider />

			<NavLink href="">Messaging</NavLink>
		</> }</>
	)
}

export default Menu
