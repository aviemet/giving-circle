import React, { useEffect } from 'react'
import { AppShell } from '@/Components'
import useLayoutStore from '@/Store/LayoutStore'
import { useMantineTheme } from '@mantine/core'
import { useHeadroom } from '@mantine/hooks'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'

import cx from 'clsx'
import * as classes from './AppLayout.css'

interface AppLayoutProps {
	children: any
}

const AppLayout = ({ children }: AppLayoutProps) => {
	const { sidebarOpen, sidebarVisible, headerPinned, setHeaderPinned } = useLayoutStore()
	const theme = useMantineTheme()
	const headroom = useHeadroom({ fixedAt: 120 })

	useEffect(() => {
		if(headroom === headerPinned) return
		setHeaderPinned(headroom)
	}, [headroom])

	return (
		<AppShell
			layout="alt"
			padding="md"
			header={ {
				height: theme.other.header.height,
				collapsed: !headerPinned,
				offset: false,
			} }
			navbar={ {
				width: theme.other.navbar.width.open,
				breakpoint: 'sm',
				collapsed: {
					mobile: !sidebarOpen || !sidebarVisible,
					desktop: !sidebarOpen || !sidebarVisible,
				},
			} }
			footer={ { height: theme.other.footer.height } }
			className={ cx(classes.appLayout) }
		>
			<AppShell.Header withBorder={ false }>
				<AppHeader />
			</AppShell.Header>

			<AppShell.Navbar p="sm">
				<AppSidebar />
			</AppShell.Navbar>

			<AppFooter />

			<AppShell.Main className={ cx(classes.main) }>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
