import clsx from "clsx"
import React, { useEffect } from "react"

import { AppShell } from "@/components"
import { useHeadroom, useTheme } from "@/lib/hooks"
import useLayoutStore from "@/store/LayoutStore"

import { LayoutProps } from ".."
import AppFooter from "./AppFooter"
import AppHeader from "./AppHeader"
import * as classes from "./AppLayout.css"
import AppSidebar from "./AppSidebar"

const AppLayout = ({ children }: LayoutProps) => {
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
				offset: true,
			} }
			navbar={ {
				width: theme.other.navbar.width.open,
				breakpoint: "sm",
				collapsed: {
					mobile: !sidebarOpen || !sidebarVisible,
					desktop: !sidebarOpen || !sidebarVisible,
				},
			} }
			footer={ { height: theme.other.footer.height } }
			className={ clsx(classes.appLayout) }
		>
			<AppShell.Header withBorder={ false }>
				<AppHeader />
			</AppShell.Header>

			<AppShell.Navbar px={ 0 } py="sm" className={ clsx(classes.navMenu) }>
				<AppSidebar />
			</AppShell.Navbar>

			<AppFooter />

			<AppShell.Main className={ clsx(classes.main, { paddingDisabled: mainPaddingDisabled }) }>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
