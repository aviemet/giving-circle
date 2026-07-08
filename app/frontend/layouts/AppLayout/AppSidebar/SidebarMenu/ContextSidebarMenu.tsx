import { useLayoutEffect, useMemo, useRef, useState } from "react"

import { Accordion } from "@/components"
import { usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"
import { menuKeys as menuKeyMap, type MenuKey } from "@/store/slices/menuSlice"

import { CircleMenu, PresentationMenu, ThemeMenu } from "../menus"
import { FadeMenu } from "./FadeMenu"

export function isMenuKey(value: string): value is MenuKey {
	return value in menuKeyMap
}

export function ContextSidebarMenu() {
	const { active_circle, active_theme, active_presentation } = usePageProps()
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const setOpenMenus = useLayoutStore((state) => state.setOpenMenus)
	const lastCircleRef = useRef<Schema.CirclesInertiaShare | undefined>(undefined)
	const lastThemeRef = useRef<Schema.ThemesInertiaShare | undefined>(undefined)
	const [userOpenMenus, setUserOpenMenus] = useState<MenuKey[] | null>(null)

	const defaultOpenMenus = useMemo((): MenuKey[] => {
		const contextToMenuMap = [
			{ context: active_circle, menuKey: menuKeys.circle },
			{ context: active_theme, menuKey: menuKeys.theme },
			{ context: active_presentation, menuKey: menuKeys.presentation },
		]

		return contextToMenuMap
			.filter(({ context }) => context)
			.map(({ menuKey }) => menuKey)
	}, [active_circle, active_theme, active_presentation, menuKeys])

	const accordionValue = useMemo((): MenuKey[] => {
		const value = new Set(userOpenMenus ?? defaultOpenMenus)

		if(defaultOpenMenus.length > 0) {
			value.add(defaultOpenMenus[defaultOpenMenus.length - 1])
		}

		return Array.from(value)
	}, [userOpenMenus, defaultOpenMenus])

	useLayoutEffect(() => {
		if(active_circle) {
			lastCircleRef.current = active_circle
		}
		if(active_theme) {
			lastThemeRef.current = active_theme
		}
	}, [active_circle, active_theme])

	const handleAccordionChange = (menus: string[]) => {
		const nextMenus = menus.filter(isMenuKey)
		setUserOpenMenus(nextMenus)
		setOpenMenus(nextMenus)
	}

	return (
		<Accordion
			multiple
			variant="separated"
			radius="lg"
			value={ accordionValue }
			onChange={ handleAccordionChange }
		>
			<FadeMenu mounted={ !!active_circle } value={ active_circle }>
				{ (styles, circle) => <CircleMenu circle={ circle } style={ styles } /> }
			</FadeMenu>

			<FadeMenu mounted={ !!active_theme } value={ active_theme }>
				{ (styles, theme) => (
					<ThemeMenu
						circle={ active_circle ?? lastCircleRef.current }
						theme={ theme }
						style={ styles }
					/>
				) }
			</FadeMenu>

			<FadeMenu mounted={ !!active_presentation } value={ active_presentation }>
				{ (styles, presentation) => (
					<PresentationMenu
						circle={ active_circle ?? lastCircleRef.current }
						theme={ active_theme ?? lastThemeRef.current }
						presentation={ presentation }
						style={ styles }
					/>
				) }
			</FadeMenu>
		</Accordion>
	)
}
