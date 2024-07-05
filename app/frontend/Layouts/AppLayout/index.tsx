import React from 'react'
import { AppShell, Box, ScrollArea } from '@/Components'
import useLayoutStore from '@/lib/store/LayoutStore'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'

import cx from 'clsx'
import * as classes from './AppLayout.css'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
	const { sidebarOpen, sidebarVisible } = useLayoutStore()

	return (
		<AppShell
			layout="alt"
			padding="md"
			header={ { height: 50 } }
			navbar={ {
				width: 250,
				breakpoint: 'sm',
				collapsed: {
					mobile: !sidebarOpen || !sidebarVisible,
					desktop: !sidebarOpen || !sidebarVisible,
				},
			} }
			footer={ { height: 40 } }
			className={ cx(classes.appLayout) }
		>
			<AppShell.Header withBorder={ false }>
				<AppHeader />
			</AppShell.Header>

			<AppShell.Navbar p="sm">
				<AppSidebar />
			</AppShell.Navbar>

			<AppFooter />

			<AppShell.Main>
				<Box component={ ScrollArea }>{ children }</Box>
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
