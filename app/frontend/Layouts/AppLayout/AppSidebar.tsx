import React from 'react'
import { Divider, Navbar, Text } from '@mantine/core'
import { Link } from '@/Components'
import { Routes } from '@/lib'
import MobileMenuToggle from './MobileMenuToggle'

const AppSidebar = () => {
	return (
		<>
			<Navbar.Section>
				<MobileMenuToggle />
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
