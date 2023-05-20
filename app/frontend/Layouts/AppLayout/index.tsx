import React from 'react'
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	Flex,
	Container,
} from '@mantine/core'
import useAppLayoutStyles from './useAppLayoutStyles'
import { useBooleanToggle } from '@/lib/hooks'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'

const AppLayout = ({ children }: { children: React.ReactNode}) => {
	const theme = useMantineTheme()
	const [opened, toggleOpened] = useBooleanToggle(false)

	const { classes } = useAppLayoutStyles()

	const breakpoint = 'sm'

	return (
		<AppShell
			styles={ {
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			} }
			navbarOffsetBreakpoint={ breakpoint }
			asideOffsetBreakpoint={ breakpoint }
			header={
				<Header height={ { base: 50 } } px="md">
					<Flex align="center" sx={ { height: '100%' } }>
						<MediaQuery largerThan={ breakpoint } styles={ { display: 'none' } }>
							<Burger
								opened={ opened }
								onClick={ toggleOpened }
								size="sm"
								color={ theme.colors.gray[6] }
								mr="xl"
							/>
						</MediaQuery>

						<AppHeader />
					</Flex>
				</Header>
			}
			navbar={
				<Navbar p="md" hiddenBreakpoint={ breakpoint } hidden={ !opened } width={ { sm: 200, lg: 300 } }>
					<AppSidebar />
				</Navbar>
			}
			footer={
				<Footer height={ 36 } px={ 8 } py={ 4 }>
					<AppFooter />
				</Footer>
			}
		>
			<>{ children }</>
		</AppShell>
	)
}

export default AppLayout
