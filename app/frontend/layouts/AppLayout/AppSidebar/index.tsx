import { useTranslation } from "react-i18next"

import {
	AppShell,
	Divider,
	Flex,
	NavLink,
	ScrollArea,
} from "@/components"
import { SettingsIcon } from "@/components/Icons"
import { ToggleNavbarButton } from "@/features"
import { Routes, theme } from "@/lib"
import { useLocation } from "@/lib/hooks"

import { CircleDropdownLink } from "./CircleDropdownLink"
import { AppSidebarMenu } from "./SidebarMenu"

export function AppSidebar() {
	const { t } = useTranslation()
	const { paths } = useLocation()

	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" align="center" mx="xs">
					{ /* Circle title and avatar */ }
					<CircleDropdownLink />
					<ToggleNavbarButton />
				</Flex>

			</AppShell.Section>

			<Divider />

			{ /* Nav menu portal */ }
			<AppShell.Section grow component={ ScrollArea } type="auto" scrollbars="y" px="xs" pt="sm">
				<AppSidebarMenu />
			</AppShell.Section>

			<Divider />

			{ /* Sticky nav links */ }
			<AppShell.Section style={ { height: `${theme.other.footer.height - 1}px` } }>
				<NavLink
					href={ Routes.settings() }
					active={ paths[0] === "settings" }
					leftSection={ <SettingsIcon /> }
					style={ { height: `${theme.other.footer.height - 1}px` } }
				>
					{ t("navigation.settings") }
				</NavLink>
			</AppShell.Section>
		</>
	)
}
