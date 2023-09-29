import React from 'react'
import { AppShell, Divider, Text } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'

const AppSidebar = () => {
	return (
		<>
			<AppShell.Section mb="xs">
				<Text>Giving Circles</Text>
			</AppShell.Section>

			<Divider />

			<AppShell.Section grow>
				<Link href={ Routes.themes() }>Themes</Link>
			</AppShell.Section>

			<Divider />

			<AppShell.Section>
			</AppShell.Section>
		</>
	)
}

export default AppSidebar
