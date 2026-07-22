import { useMemo, useState } from "react"

import { Accordion } from "@/components"
import { SettingsIcon } from "@/components/Icons"
import { useLocation, usePageProps } from "@/lib/hooks"
import { administrableCircles } from "@/lib/roles"

import { CircleSettingsMenu } from "../menus/CircleSettingsMenu"
import { SettingsMenu, settingsMenuKey } from "../menus/SettingsMenu"

export function SettingsSidebarMenu() {
	const { auth, circles } = usePageProps()
	const { paths } = useLocation()

	const circlesForSettings = useMemo(
		() => administrableCircles(auth.user.roles, circles),
		[auth.user.roles, circles],
	)

	const onGeneralSettings = paths[1] === "general"

	const defaultOpenMenus = useMemo(() => {
		const menus = circlesForSettings.map((circle) => circle.slug)
		if(onGeneralSettings) menus.unshift(settingsMenuKey)
		return menus
	}, [circlesForSettings, onGeneralSettings])

	const [userOpenMenus, setUserOpenMenus] = useState<string[] | null>(null)

	const openMenus = useMemo(() => {
		const base = userOpenMenus ?? defaultOpenMenus
		const circleSlugs = circlesForSettings.map((circle) => circle.slug)
		const missingCircleSlugs = circleSlugs.filter((slug) => !base.includes(slug))
		let merged = missingCircleSlugs.length === 0 ? base : [...base, ...missingCircleSlugs]

		if(onGeneralSettings && !merged.includes(settingsMenuKey)) {
			merged = [...merged, settingsMenuKey]
		}

		return merged
	}, [userOpenMenus, defaultOpenMenus, circlesForSettings, onGeneralSettings])

	return (
		<Accordion
			multiple
			variant="separated"
			radius="lg"
			value={ openMenus }
			onChange={ setUserOpenMenus }
		>
			<SettingsMenu />

			{ circlesForSettings.map((circle) => (
				<Accordion.Item key={ circle.slug } value={ circle.slug }>
					<Accordion.Control icon={ <SettingsIcon /> }>{ circle.name }</Accordion.Control>
					<Accordion.Panel>
						<CircleSettingsMenu circle={ circle } />
					</Accordion.Panel>
				</Accordion.Item>
			)) }
		</Accordion>
	)
}
