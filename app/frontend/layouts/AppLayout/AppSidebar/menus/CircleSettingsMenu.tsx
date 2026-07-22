import { NavLink } from "@/components"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"

interface CircleSettingsMenuProps {
	circle: Schema.CirclesInertiaShare
}

export function CircleSettingsMenu({ circle }: CircleSettingsMenuProps) {
	const { paths } = useLocation()
	const isThisCircle = paths[1] === circle.slug

	return (
		<>
			<NavLink
				href={ Routes.settingsBranding(circle.slug) }
				active={ isThisCircle && paths[2] === "branding" }
			>
				Branding
			</NavLink>

			<NavLink
				href={ Routes.settingsSmtps(circle.slug) }
				active={ isThisCircle && paths[2] === "mail" }
			>
				Mail
			</NavLink>

			<NavLink
				href={ Routes.settingsNotifications(circle.slug) }
				active={ isThisCircle && paths[2] === "notifications" }
			>
				Notifications
			</NavLink>

			<NavLink
				href={ Routes.settingsIntegrations(circle.slug) }
				active={ isThisCircle && paths[2] === "integrations" }
			>
				Integrations
			</NavLink>
		</>
	)
}
