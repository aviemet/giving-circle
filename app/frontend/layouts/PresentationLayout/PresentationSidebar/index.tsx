import { Link } from "@inertiajs/react"
import { useTranslation } from "react-i18next"

import {
	ActionIcon,
	AppShell,
	Divider,
	Flex,
	NavLink,
	Tooltip,
} from "@/components"
import { LogoutIcon, SettingsIcon } from "@/components/Icons"
import { ToggleNavbarButton } from "@/features"
import { Routes, theme } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import { PresentationSidebarMenu } from "./Menu"

export function PresentationSidebar() {
	const { t } = useTranslation()
	const { active_circle, active_theme, active_presentation } = usePageProps()

	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" align="center" mx="xs">
					{ /* Circle title and avatar */ }
					<ToggleNavbarButton />
					{ active_circle && active_theme && active_presentation && (
						<Tooltip label={ t("navigation.exitPresentationControls") }>
							<ActionIcon
								component={ Link }
								href={ Routes.themePresentation(
									active_circle.slug,
									active_theme.slug,
									active_presentation.slug,
								) }
								variant="subtle"
								color="gray"
								aria-label={ t("navigation.exitPresentationControls") }
							>
								<LogoutIcon />
							</ActionIcon>
						</Tooltip>
					) }
				</Flex>
			</AppShell.Section>

			<Divider />

			{ /* Nav menu portal */ }
			<AppShell.Section grow>
				<PresentationSidebarMenu />
			</AppShell.Section>

			<Divider />

			{ /* Sticky nav links */ }
			<AppShell.Section style={ { height: `${theme.other.footer.height - 1}px` } }>
				<NavLink
					href={ Routes.settings() }
					leftSection={ <SettingsIcon /> }
					style={ { height: `${theme.other.footer.height - 1}px` } }
				>
					{ t("navigation.settings") }
				</NavLink>
			</AppShell.Section>
		</>
	)
}
