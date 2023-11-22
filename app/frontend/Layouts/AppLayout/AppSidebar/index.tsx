import React from 'react'
import { AppShell, Divider, Text, NavLink } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'
import CircleHeaderMenu from './CircleHeaderMenu'
import { circleMenu, themeMenu } from './menus'
import { usePageProps } from '@/lib/hooks'

const AppSidebar = () => {
	const props = usePageProps()

	console.log({ props })

	return (
		<>
			<AppShell.Section mb="xs">
				<CircleHeaderMenu />
			</AppShell.Section>

			<Divider />

			<AppShell.Section grow>
				{ /* <Link href={ Routes.the }>Themes</Link> */ }
			</AppShell.Section>

			<Divider />

			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar
