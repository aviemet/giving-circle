import React from "react"
import { useTranslation } from "react-i18next"

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
	const { t } = useTranslation()
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
					{ t("navigation.dashboard") }
				</NavLink>

				<NavLink
					href={ Routes.circleMemberships(circle.slug) }
					active={ location.paths[1] === "memberships" }
					leftSection={ <UserGroupIcon /> }
				>
					{ t("navigation.members") }
				</NavLink>

				<NavLink
					href={ Routes.circleOrgs(circle.slug) }
					active={ location.paths[1] === "orgs" }
					leftSection={ <OrgsIcon /> }
				>
					{ t("navigation.orgs") }
				</NavLink>

				<NavLink
					href={ Routes.circleTemplates(circle.slug) }
					active={ location.paths[1] === "templates" }
					leftSection={ <PresentationIcon /> }
				>
					{ t("navigation.presentationTemplates") }
				</NavLink>

				<NavLink
					href={ Routes.circleInteractionTemplates(circle.slug) }
					active={ location.paths[1] === "interaction_templates" }
					leftSection={ <PresentationIcon /> }
				>
					{ t("navigation.interactionTemplates") }
				</NavLink>

				<NavLink
					href={ Routes.circleThemes(circle.slug) }
					active={ location.paths[1] === "themes" }
					leftSection={ <ThemesIcon /> }
				>
					{ t("navigation.themes") }
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
