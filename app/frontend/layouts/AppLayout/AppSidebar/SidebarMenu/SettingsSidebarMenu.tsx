import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { Accordion, ActionIcon, Group, Menu } from "@/components"
import { DownArrowIcon, SettingsIcon } from "@/components/Icons"
import { Routes } from "@/lib"
import { useLocation, usePageProps } from "@/lib/hooks"
import { administrableCircles } from "@/lib/roles"

import { CircleSettingsMenu } from "../menus/CircleSettingsMenu"
import { SettingsMenu, settingsMenuKey } from "../menus/SettingsMenu"
import { TemplatesSettingsMenu, templatesSettingsMenuKey } from "../menus/TemplatesSettingsMenu"

function settingsPathForCircle(paths: string[], circleSlug: string) {
	if(paths[1] === "general" || paths.length < 3) {
		return Routes.settingsBranding(circleSlug)
	}

	const section = paths[2]

	if(section === "branding") return Routes.settingsBranding(circleSlug)
	if(section === "mail") return Routes.settingsSmtps(circleSlug)
	if(section === "notifications") return Routes.settingsNotifications(circleSlug)
	if(section === "integrations") return Routes.settingsIntegrations(circleSlug)
	if(section === "templates") return Routes.settingsTemplates(circleSlug)
	if(section === "interaction_templates") return Routes.settingsInteractionTemplates(circleSlug)

	return Routes.settingsBranding(circleSlug)
}

export function SettingsSidebarMenu() {
	const { t } = useTranslation()
	const { auth, circles, active_circle } = usePageProps()
	const { paths } = useLocation()

	const circlesForSettings = useMemo(
		() => administrableCircles(auth.user.roles, circles),
		[auth.user.roles, circles],
	)

	const scopedCircle = useMemo(() => {
		const pathCircle = circlesForSettings.find((circle) => circle.slug === paths[1])
		if(pathCircle) return pathCircle

		if(active_circle) {
			const activeAdministrable = circlesForSettings.find((circle) => circle.id === active_circle.id)
			if(activeAdministrable) return activeAdministrable
		}

		return circlesForSettings[0]
	}, [circlesForSettings, paths, active_circle])

	const defaultOpenMenus = useMemo(() => {
		const menus = [settingsMenuKey]
		if(scopedCircle) {
			menus.push(scopedCircle.slug, templatesSettingsMenuKey)
		}
		return menus
	}, [scopedCircle])

	const [userOpenMenus, setUserOpenMenus] = useState<{
		circleSlug: string | undefined
		menus: string[]
	} | null>(null)

	const openMenus =
		userOpenMenus !== null && userOpenMenus.circleSlug === scopedCircle?.slug
			? userOpenMenus.menus
			: defaultOpenMenus
	const hasMultipleCircles = circlesForSettings.length > 1

	return (
		<Accordion
			multiple
			variant="separated"
			radius="lg"
			value={ openMenus }
			onChange={ (menus) => setUserOpenMenus({ circleSlug: scopedCircle?.slug, menus }) }
		>
			<SettingsMenu />

			{ scopedCircle && (
				<Accordion.Item key={ scopedCircle.slug } value={ scopedCircle.slug }>
					{ hasMultipleCircles
						? (
							<Group wrap="nowrap" gap={ 0 } align="stretch">
								<Accordion.Control icon={ <SettingsIcon /> } style={ { flex: 1 } }>
									{ scopedCircle.name }
								</Accordion.Control>
								<Menu offset={ 9 } position="bottom-end" withArrow>
									<Menu.Target>
										<ActionIcon
											variant="transparent"
											aria-label={ t("navigation.switchCircle") }
											style={ { alignSelf: "center" } }
										>
											<DownArrowIcon />
										</ActionIcon>
									</Menu.Target>
									<Menu.Dropdown>
										{ circlesForSettings.map((circleOption) => (
											<Menu.Link
												key={ circleOption.id }
												href={ settingsPathForCircle(paths, circleOption.slug) }
											>
												{ circleOption.name }
											</Menu.Link>
										)) }
									</Menu.Dropdown>
								</Menu>
							</Group>
						)
						: (
							<Accordion.Control icon={ <SettingsIcon /> }>
								{ scopedCircle.name }
							</Accordion.Control>
						) }
					<Accordion.Panel>
						<CircleSettingsMenu circle={ scopedCircle } />
					</Accordion.Panel>
				</Accordion.Item>
			) }

			{ scopedCircle && <TemplatesSettingsMenu circle={ scopedCircle } /> }
		</Accordion>
	)
}
