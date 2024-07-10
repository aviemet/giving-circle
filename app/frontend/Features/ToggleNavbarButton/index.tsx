import React from 'react'
import { Burger, BurgerProps } from '@/Components'
import useLayoutStore from '@/Store/LayoutStore'

interface ToggleNavBarButton extends BurgerProps {}

const ToggleNavbarButton = (props: ToggleNavBarButton) => {
	const { sidebarOpen, sidebarVisible, toggleSidebarOpen } = useLayoutStore()

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
