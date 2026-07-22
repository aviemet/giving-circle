import { useTranslation } from "react-i18next"

import { Accordion, NavLink } from "@/components"
import { SettingsIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useLocation } from "@/lib/hooks"

export const settingsMenuKey = "settings"

export function SettingsMenu() {
	const { t } = useTranslation()
	const { paths } = useLocation()

	return (
		<Accordion.Item value={ settingsMenuKey }>
			<Accordion.Control icon={ <SettingsIcon /> }>{ t("navigation.settings") }</Accordion.Control>
			<Accordion.Panel>
				<NavLink
					href={ Routes.settingsGeneral() }
					active={ paths[1] === "general" }
				>
					{ t("navigation.general") }
				</NavLink>
			</Accordion.Panel>
		</Accordion.Item>
	)
}
