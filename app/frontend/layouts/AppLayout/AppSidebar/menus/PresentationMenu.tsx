import { isEmpty } from "es-toolkit/compat"

import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

export function PresentationMenu() {
	const { active_circle, active_theme, active_presentation } = usePageProps()
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const toggleOpenMenu = useLayoutStore((state) => state.toggleOpenMenu)

	useInit(() => {
		toggleOpenMenu("circle", false)
		toggleOpenMenu("theme", false)
		toggleOpenMenu("presentation", true)
	})

	if(isEmpty(active_circle) || isEmpty(active_theme) || isEmpty(active_presentation)) return <></>

	return (
		<Accordion.Item key={ menuKeys.presentation } value={ menuKeys.presentation }>
			<Accordion.Control>{ active_presentation.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink href={ Routes.themePresentation(
					active_circle.slug,
					active_theme.slug,
					active_presentation.slug
				) }>
					Overview
				</NavLink>
				<NavLink href={ Routes.editThemePresentation(
					active_circle.slug,
					active_theme.slug,
					active_presentation.slug
				) }>
					Setup
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
