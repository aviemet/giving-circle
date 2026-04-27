import { Burger, BurgerProps } from "@/components"
import { useLayoutStore } from "@/store"

interface ToggleNavBarButton extends BurgerProps {}

const ToggleNavbarButton = (props: ToggleNavBarButton) => {
	const sidebarOpen = useLayoutStore((state) => state.sidebarOpen)
	const sidebarVisible = useLayoutStore((state) => state.sidebarVisible)
	const toggleSidebarOpen = useLayoutStore((state) => state.toggleSidebarOpen)

	return (
		<>
			{ sidebarVisible && <>
				<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } hiddenFrom="sm" size="sm" { ...props } />
				<Burger opened={ sidebarOpen } onClick={ () => toggleSidebarOpen() } visibleFrom="sm" size="sm" { ...props } />
			</> }
		</>
	)
}

export default ToggleNavbarButton
