import { isEmpty } from "lodash"

import { Accordion, NavLink } from "@/components"
import { DashboardIcon, OrgsIcon, PresentationIcon, ThemesIcon, UserGroupIcon } from "@/components/Icons"
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

				<NavLink
					href={ Routes.circle(active_circle.slug) }
					leftSection={ <DashboardIcon /> }
				>
					Dashboard
				</NavLink>

				<NavLink
					href={ Routes.circleMemberships(active_circle.slug) }
					leftSection={ <UserGroupIcon /> }
				>
					Members
				</NavLink>

				<NavLink
					href={ Routes.circleThemes(active_circle.slug) }
					leftSection={ <ThemesIcon /> }
				>
					Themes
				</NavLink>

				<NavLink
					href={ Routes.circleOrgs(active_circle.slug) }
					leftSection={ <OrgsIcon /> }
				>
					Orgs
				</NavLink>

				<NavLink
					href={ Routes.circlePresentationTemplates(active_circle.slug) }
					leftSection={ <PresentationIcon /> }
				>
					Presentation Templates
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}

export default CircleMenu
