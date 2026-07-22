import { useLocation } from "@/lib/hooks"

import { ContextSidebarMenu } from "./ContextSidebarMenu"
import { SettingsSidebarMenu } from "./SettingsSidebarMenu"

export function AppSidebarMenu() {
	const { paths } = useLocation()

	if(paths[0] === "settings") {
		return <SettingsSidebarMenu />
	}

	return <ContextSidebarMenu />
}
