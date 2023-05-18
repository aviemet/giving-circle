import { AppShell, Aside, Footer, Header, Navbar } from '@mantine/core'
import React from 'react'

interface PublicLayoutProps {
	children: any
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
	return (
		<AppShell
			padding="md"
			layout='alt'
			header={
				<Header height={ 60 } p="xs">
				</Header>
			}
			navbar={
				<Navbar width={ { base: 300 } } p="xs">
				</Navbar>
			}
			footer={
				<Footer height={ 40 } p="xs">Footer</Footer>
			}
			styles={ (theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
			}) }
		>
			{ children }
		</AppShell>
	)
}

export default PublicLayout
