import React from 'react'
import { AppShell, Divider, Text, NavLink, Portal } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'
import CircleHeaderMenu from './CircleHeaderMenu'
import { useLocation, usePageProps } from '@/lib/hooks'
import useLayoutStore from '@/lib/store/LayoutStore'
import { menus } from './menus'


const AppSidebar = () => {
	const { NavMenu } = useLayoutStore()
	const props = usePageProps()

	return (
		<>
			<AppShell.Section mb="xs">
				<CircleHeaderMenu />
			</AppShell.Section>

			<Divider />

			<AppShell.Section grow>
				{ NavMenu }
			</AppShell.Section>

			<Divider />

			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar
