import React from "react"

import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
import { useInit } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

interface PresentationMenuProps {
	circle?: Schema.CirclesInertiaShare
	theme?: Schema.ThemesInertiaShare
	presentation?: Schema.PresentationsInertiaShare
	style?: React.CSSProperties
}

export function PresentationMenu({ circle, theme, presentation, style }: PresentationMenuProps) {
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const toggleOpenMenu = useLayoutStore((state) => state.toggleOpenMenu)

	useInit(() => {
		toggleOpenMenu("presentation", true)
	})

	if(!circle || !theme || !presentation) return <></>

	return (
		<Accordion.Item key={ menuKeys.presentation } value={ menuKeys.presentation } style={ style }>
			<Accordion.Control>{ presentation.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink href={ Routes.themePresentation(
					circle.slug,
					theme.slug,
					presentation.slug
				) }>
					Overview
				</NavLink>
				<NavLink href={ Routes.editThemePresentation(
					circle.slug,
					theme.slug,
					presentation.slug
				) }>
					Setup
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
