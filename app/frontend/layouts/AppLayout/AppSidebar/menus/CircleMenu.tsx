import { isEmpty } from "lodash"

import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
import { useInit, usePageProps } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

const CircleMenu = () => {
	const { active_circle } = usePageProps()
	const { menuKeys, toggleOpenMenu } = useLayoutStore()

	useInit(() => {
		toggleOpenMenu("circle", true)
		toggleOpenMenu("theme", false)
		toggleOpenMenu("presentation", false)
	})

	if(isEmpty(active_circle)) return <></>

	return (
		<Accordion.Item key={ menuKeys.circle } value={ menuKeys.circle }>
			<Accordion.Control>{ active_circle.name }</Accordion.Control>
			<Accordion.Panel>
				<NavLink href={ Routes.circle(active_circle.slug) }>
					Dashboard
				</NavLink>
				<NavLink href={ Routes.circleMemberships(active_circle.slug) }>
					Members
				</NavLink>
				<NavLink href={ Routes.circlePresentationTemplates(active_circle.slug) }>
					Presentation Templates
				</NavLink>
				<NavLink href={ Routes.circleThemes(active_circle.slug) }>
					Themes
				</NavLink>
				<NavLink href={ Routes.circleOrgs(active_circle.slug) }>
					Orgs
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default CircleMenu
