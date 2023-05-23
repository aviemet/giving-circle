import React from 'react'
import { Box, Divider, Navbar, Text } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'
import cx from 'clsx'

const AppSidebar = () => {
	return (
		<>
			<Navbar.Section>
				<Text>Giving Circle</Text>
			</Navbar.Section>

			<Divider />

			<Navbar.Section grow>
				<Link href={ Routes.themes() }>Themes</Link>
			</Navbar.Section>

			<Divider />

			<Navbar.Section>
			</Navbar.Section>
		</>
	)
}

export default AppSidebar
