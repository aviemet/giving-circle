import React, { useEffect } from 'react'
import {
	AppShell,
	Navbar,
	Header,
	Footer,
	MediaQuery,
	Burger,
	useMantineTheme,
	Flex,
	Box,
	ScrollArea,
} from '@mantine/core'
import useAppLayoutStyles from './useAppLayoutStyles'
import { useBooleanToggle } from '@/lib/hooks'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'
import { usePage } from '@inertiajs/react'
import { useUrl } from 'react-use-url'
import cx from 'clsx'
import useLayoutStore from '../store/LayoutStore'

const AppLayout = ({ children }: { children: any }) => {
	const theme = useMantineTheme()
	const { sidebarOpen, sidebarVisible, toggleSidebarOpen, setSidebarVisible } = useLayoutStore()

	const { classes } = useAppLayoutStyles()

	const { path } = useUrl()

	useEffect(() => {
		if(path.length === 0 || path[0] === 'dashboard') {
			setSidebarVisible(false)
		} else {
			setSidebarVisible(true)
		}
	}, [path])

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
			// layout="alt"
			header={
				<Header height={ { base: 50 } } px="md">
					<Flex align="center" sx={ { height: '100%' } }>
						<MediaQuery largerThan={ breakpoint } styles={ { display: 'none' } }>
							<Burger
								opened={ sidebarOpen }
								onClick={ () => toggleSidebarOpen() }
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
				<Navbar
					className={ cx(classes.navbar) }
					hiddenBreakpoint={ breakpoint }
					p={ sidebarVisible ? 'md' : 0 }
					hidden={ !sidebarOpen }
					width={ sidebarVisible ? {
						sm: 200, lg: 300,
					} : {
						xs: 0,
					} }
				>
					<AppSidebar />
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
