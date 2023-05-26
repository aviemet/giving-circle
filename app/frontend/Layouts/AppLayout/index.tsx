import React, { useEffect } from 'react'
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	useMantineTheme,
	Flex,
	Box,
	ScrollArea,
} from '@mantine/core'
import useAppLayoutStyles from './useAppLayoutStyles'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'
import { useUrl } from 'react-use-url'
import cx from 'clsx'
import useLayoutStore from '../store/LayoutStore'
import MobileMenuToggle from './MobileMenuToggle'

const AppLayout = ({ children }: { children: any }) => {
	const theme = useMantineTheme()
	const { sidebarOpen, sidebarVisible, sidebarBreakpoint, setSidebarVisible } = useLayoutStore()

	const { classes } = useAppLayoutStyles()

	const { path } = useUrl()

	useEffect(() => {
		if(path.length === 0 || path[0] === 'dashboard') {
			setSidebarVisible(false)
		} else {
			setSidebarVisible(true)
		}
	}, [path])

	return (
		<AppShell
			styles={ {
				main: {
					background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
				},
			} }
			navbarOffsetBreakpoint={ sidebarBreakpoint }
			asideOffsetBreakpoint={ sidebarBreakpoint }
			layout="alt"
			header={
				<Header height={ { base: 50 } } px="md">
					<Flex align="center" sx={ { height: '100%' } }>
						<MobileMenuToggle />
						<AppHeader />
					</Flex>
				</Header>
			}
			navbar={
				<Navbar
					className={ cx(classes.navbar) }
					hiddenBreakpoint={ sidebarBreakpoint }
					p={ sidebarVisible ? 'md' : 0 }
					hidden={ !sidebarOpen }
					width={ sidebarVisible ? {
						sm: 200, lg: 300,
					} : {
						xs: 0,
					} }
					sx={ { overflow: 'hidden' } }
				>
					{ sidebarVisible && <AppSidebar /> }
				</Navbar>
			}
			footer={
				<Footer height={ 36 } px={ 8 } py={ 4 }>
					<AppFooter />
				</Footer>
			}
		>
			<Box component={ ScrollArea }>{ children }</Box>
		</AppShell>
	)
}

export default AppLayout
