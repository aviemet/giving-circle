import { isEmpty } from "lodash"

import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

const ThemeMenu = () => {
	const { active_circle, active_theme } = usePageProps()
	const { menuKeys, toggleOpenMenu } = useLayoutStore()

	useInit(() => {
		toggleOpenMenu("circle", false)
		toggleOpenMenu("theme", true)
		toggleOpenMenu("presentation", false)
	})

	if(isEmpty(active_circle) || isEmpty(active_theme)) return <></>

	return (
		<Accordion.Item key={ menuKeys.theme } value={ menuKeys.theme }>
			<Accordion.Control>{ active_theme.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.theme(active_circle.slug, active_theme.slug) }
					label="Overview"
				/>

				<NavLink
					href={ Routes.themeOrgs(active_circle.slug, active_theme.slug) }
					label="Organizations"
				/>

				<NavLink
					href={ Routes.themePresentations(active_circle.slug, active_theme.slug) }
					label="Presentations"
				/>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default ThemeMenu
