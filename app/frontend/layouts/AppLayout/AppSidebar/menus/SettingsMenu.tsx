import { Accordion, NavLink } from "@/components"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"

export const settingsMenuKey = "settings"

export function SettingsMenu() {
	const { paths } = useLocation()

	return (
		<Accordion.Item value={ settingsMenuKey }>
			<Accordion.Control>Settings</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.settingsGeneral() }
					active={ paths[1] === "general" }
				>
					General
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
