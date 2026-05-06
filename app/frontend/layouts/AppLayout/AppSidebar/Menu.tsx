import { Transition } from "@mantine/core"
import React, { useEffect, useMemo, useState } from "react"

import { Accordion } from "@/components"
import { usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"
import { menuKeys as menuKeyMap, type MenuKey } from "@/store/slices/menuSlice"

import { CircleMenu, PresentationMenu, ThemeMenu } from "./menus"

export interface MenuProps {
	circle: Schema.CirclesInertiaShare
}

function isMenuKey(value: string): value is MenuKey {
	return value in menuKeyMap
}

export function AppSidebarMenu() {
	const { active_circle, active_theme, active_presentation } = usePageProps()
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const openMenus = useLayoutStore((state) => state.openMenus)
	const setOpenMenus = useLayoutStore((state) => state.setOpenMenus)

	// To support fade out animations
	const [lastCircle, setLastCircle] = useState<Schema.CirclesInertiaShare | undefined>(undefined)
	const [lastTheme, setLastTheme] = useState<Schema.ThemesInertiaShare | undefined>(undefined)
	const [lastPresentation, setLastPresentation] = useState<Schema.PresentationsInertiaShare | undefined>(undefined)

	const effectiveCircle = useMemo(() => active_circle ?? lastCircle, [active_circle, lastCircle])
	const effectiveTheme = useMemo(() => active_theme ?? lastTheme, [active_theme, lastTheme])
	const effectivePresentation = useMemo(() => active_presentation ?? lastPresentation, [active_presentation, lastPresentation])

	if(active_circle && active_circle !== lastCircle) setLastCircle(active_circle)
	if(active_theme && active_theme !== lastTheme) setLastTheme(active_theme)
	if(active_presentation && active_presentation !== lastPresentation) setLastPresentation(active_presentation)

	const handleAccordionChange = (menus: string[]) => {
		setOpenMenus(menus.filter(isMenuKey))
	}

	// Expand the bottom most menu upon navigation
	useEffect(() => {
		const contextToMenuMap = [
			{ context: active_circle, menuKey: menuKeys.circle },
			{ context: active_theme, menuKey: menuKeys.theme },
			{ context: active_presentation, menuKey: menuKeys.presentation },
		]

		const activeMenus = contextToMenuMap
			.filter(({ context }) => context)
			.map(({ menuKey }) => menuKey)

		if(activeMenus.length > 0) {
			const bottomMostMenu = activeMenus[activeMenus.length - 1]
			if(!openMenus.has(bottomMostMenu)) {
				setOpenMenus([...Array.from(openMenus), bottomMostMenu])
			}
		}
	}, [active_circle, active_theme, active_presentation, openMenus, setOpenMenus, menuKeys])

	return (
		<Accordion
			multiple
			variant="separated"
			radius="lg"
			value={ Array.from(openMenus) }
			onChange={ handleAccordionChange }
		>
			<FadeMenu mounted={ !!active_circle }>
				{ (styles) => <CircleMenu circle={ effectiveCircle } style={ styles } /> }
			</FadeMenu>

			<FadeMenu mounted={ !!active_theme }>
				{ (styles) => (
					<ThemeMenu
						circle={ effectiveCircle }
						theme={ effectiveTheme }
						style={ styles }
					/>
				) }
			</FadeMenu>

			<FadeMenu mounted={ !!active_presentation }>
				{ (styles) => (
					<PresentationMenu
						circle={ effectiveCircle }
						theme={ effectiveTheme }
						presentation={ effectivePresentation }
						style={ styles }
					/>
				) }
			</FadeMenu>
		</Accordion>
	)
}

interface FadeMenuProps {
	mounted: boolean
	children: (styles: React.CSSProperties) => React.ReactElement
}

function FadeMenu({ mounted, children }: FadeMenuProps) {
	return (
		<Transition mounted={ mounted } transition="fade" duration={ 150 } timingFunction="linear">
			{ children }
		</Transition>
	)
}
