import React from "react"

import { Accordion, NavLink } from "@/components"
import { DashboardIcon, OrgsIcon, PresentationIcon, ThemesIcon, UserGroupIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

interface CircleMenuProps {
	circle?: Schema.CirclesInertiaShare
	style?: React.CSSProperties
}

export function CircleMenu({ circle, style }: CircleMenuProps) {
	const menuKeys = useLayoutStore((state) => state.menuKeys)
	const location = useLocation()

	if(!circle) return null

	return (
		<Accordion.Item key={ menuKeys.circle } value={ menuKeys.circle } style={ style }>
			<Accordion.Control>{ circle.name }</Accordion.Control>
			<Accordion.Panel>

				<NavLink
					href={ Routes.circle(circle.slug) }
					leftSection={ <DashboardIcon /> }
				>
					Dashboard
				</NavLink>

				<NavLink
					href={ Routes.circleMemberships(circle.slug) }
					active={ location.paths[1] === "memberships" }
					leftSection={ <UserGroupIcon /> }
				>
					Members
				</NavLink>

				<NavLink
					href={ Routes.circleOrgs(circle.slug) }
					active={ location.paths[1] === "orgs" }
					leftSection={ <OrgsIcon /> }
				>
					Orgs
				</NavLink>

				<NavLink
					href={ Routes.circleTemplates(circle.slug) }
					active={ location.paths[1] === "templates" }
					leftSection={ <PresentationIcon /> }
				>
					Presentation Templates
				</NavLink>

				<NavLink
					href={ Routes.circleThemes(circle.slug) }
					active={ location.paths[1] === "themes" }
					leftSection={ <ThemesIcon /> }
				>
					Themes
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
