import { useTranslation } from "react-i18next"

import { Burger, BurgerProps } from "@/components"
import { useLayoutStore } from "@/store"

interface ToggleNavBarButton extends BurgerProps {}

export function ToggleNavbarButton(props: ToggleNavBarButton) {
	const { hidden, ...burgerProps } = props
	const { t } = useTranslation()
	const sidebarOpen = useLayoutStore((state) => state.sidebarOpen)
	const sidebarVisible = useLayoutStore((state) => state.sidebarVisible)
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)

	if(!sidebarVisible || hidden) {
		return null
	}

	const ariaLabel = sidebarOpen 
		? t("navigation.collapseSidebar")
		: t("navigation.expandSidebar")

	return (
		<>
			<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } hiddenFrom="sm" size="sm" aria-label={ ariaLabel } { ...burgerProps } />
			<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } visibleFrom="sm" size="sm" aria-label={ ariaLabel } { ...burgerProps } />
		</>
	)
}
