import React from 'react'
import { Burger } from '@/Components'
import useLayoutStore from '@/Store/LayoutStore'
import { BurgerProps } from '@mantine/core'

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
