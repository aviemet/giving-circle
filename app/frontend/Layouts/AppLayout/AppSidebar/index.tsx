import React from 'react'
import { AppShell, Divider, Text, NavLink } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'
import CircleHeaderMenu from './CircleHeaderMenu'


const AppSidebar = () => {
	return (
		<>
			<AppShell.Section mb="xs">
				<CircleHeaderMenu />
			</AppShell.Section>

			<Divider />

			<AppShell.Section grow id="dynamic-nav-menu">
			</AppShell.Section>

			<Divider />

			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar
