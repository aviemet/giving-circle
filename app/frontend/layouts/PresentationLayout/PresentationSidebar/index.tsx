import {
	AppShell,
	Divider,
	Flex,
	NavLink,
} from "@/components"
import { SettingsIcon } from "@/components/Icons"
import { ToggleNavbarButton } from "@/features"
import { Routes, theme } from "@/lib"

import { PresentationSidebarMenu } from "./Menu"

export function PresentationSidebar() {
	return (
		<>
			<AppShell.Section mb="xs">
				{ /* Navbar toggle */ }
				<Flex justify="space-between" align="center" mx="xs">
					{ /* Circle title and avatar */ }
					<ToggleNavbarButton />
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
					Settings
				</NavLink>
			</AppShell.Section>
		</>
	)
}
