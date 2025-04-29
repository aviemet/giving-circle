import React, { useEffect } from 'react'
import { AppShell } from '@/components'
import useLayoutStore from '@/store/LayoutStore'
import { useHeadroom, useTheme } from '@/lib/hooks'

import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'

import cx from 'clsx'
import * as classes from './AppLayout.css'

interface AppLayoutProps {
	children: any
}

const AppLayout = ({ children }: AppLayoutProps) => {
	const {
		sidebarOpen,
		sidebarVisible,
		mainPaddingDisabled,
		headerPinned,
		setHeaderPinned,
	} = useLayoutStore()
	const theme = useTheme()
	const headroom = useHeadroom({ fixedAt: 120 })

	useEffect(() => {
		if(headroom === headerPinned) return
		setHeaderPinned(headroom)
	}, [headerPinned, headroom, setHeaderPinned])

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

			<AppShell.Navbar px={ 0 } py="sm" className={ cx(classes.navMenu) }>
				<AppSidebar />
			</AppShell.Navbar>

			<AppFooter />

			<AppShell.Main className={ cx(classes.main, { paddingDisabled: mainPaddingDisabled }) }>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
