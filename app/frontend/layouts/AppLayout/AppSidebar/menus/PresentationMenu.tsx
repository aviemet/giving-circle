import React from "react"

import { Accordion, NavLink } from "@/components"
import { DashboardIcon, CircleDotIcon, SettingsIcon, SlidesIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

interface PresentationMenuProps {
	circle?: Schema.CirclesInertiaShare
	theme?: Schema.ThemesInertiaShare
	presentation?: Schema.PresentationsInertiaShare
	style?: React.CSSProperties
}

export function PresentationMenu({ circle, theme, presentation, style }: PresentationMenuProps) {
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const location = useLocation()

	if(!circle || !theme || !presentation) return null

	return (
		<Accordion.Item key={ menuKeys.presentation } value={ menuKeys.presentation } style={ style }>
			<Accordion.Control>{ presentation.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					leftSection={ <DashboardIcon /> }
					href={ Routes.themePresentation(
						circle.slug,
						theme.slug,
						presentation.slug
					) }
				>
					Overview
				</NavLink>
				<NavLink
					leftSection={ <SlidesIcon /> }
					href={ Routes.themePresentationSlides(
						circle.slug,
						theme.slug,
						presentation.slug
					) }
					active={ location.paths[5] === "slides" }
				>
					Slides
				</NavLink>
				<NavLink
					leftSection={ <CircleDotIcon /> }
					href={ Routes.themePresentationInteractions(
						circle.slug,
						theme.slug,
						presentation.slug
					) }
					active={ location.paths[5] === "interactions" }
				>
					Interactions
				</NavLink>
				<NavLink
					leftSection={ <SettingsIcon /> }
					href={ Routes.themePresentationSettings(
						circle.slug,
						theme.slug,
						presentation.slug
					) }
					active={ location.paths[5] === "settings" }
				>
					Settings
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
