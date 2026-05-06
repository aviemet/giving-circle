import React from "react"

import { Accordion, NavLink } from "@/components"
import { DashboardIcon, OrgsIcon, PresentationIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useInit, useLocation } from "@/lib/hooks"
import { useLayoutStore } from "@/store"


interface ThemeMenuProps {
	circle?: Schema.CirclesInertiaShare
	theme?: Schema.ThemesInertiaShare
	style?: React.CSSProperties
}

export function ThemeMenu({ circle, theme, style }: ThemeMenuProps) {
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const toggleOpenMenu = useLayoutStore((state) => state.toggleOpenMenu)
	const location = useLocation()

	useInit(() => {
		toggleOpenMenu("theme", true)
	})

	if(!circle || !theme) return <></>

	return (
		<Accordion.Item key={ menuKeys.theme } value={ menuKeys.theme } style={ style }>
			<Accordion.Control>{ theme.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.theme(circle.slug, theme.slug) }
					leftSection={ <DashboardIcon /> }
				>
					Overview
				</NavLink>

				<NavLink
					href={ Routes.themeOrgs(circle.slug, theme.slug) }
					active={ location.paths[3] === "orgs" }
					leftSection={ <OrgsIcon /> }
				>
					Organizations
				</NavLink>

				<NavLink
					href={ Routes.themePresentations(circle.slug, theme.slug) }
					active={ location.paths[3] === "presentations" }
					leftSection={ <PresentationIcon /> }
				>
					Presentations
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
