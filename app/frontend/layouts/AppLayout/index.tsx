import clsx from "clsx"
import { useEffect } from "react"

import { AppShell } from "@/components"
import { useHeadroom, useTheme } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

import { LayoutProps } from ".."
import { shellRootKeepsHeaderScrollSlot } from "../AppShellHeaderOffsetWhenCollapsed.css"
import { AppFooter } from "./AppFooter"
import { AppHeader } from "./AppHeader"
import * as classes from "./AppLayout.css"
import { AppSidebar } from "./AppSidebar"


export function AppLayout({ children }: LayoutProps) {
	const sidebarOpen = useLayoutStore((state) => state.sidebarOpen)
	const sidebarVisible = useLayoutStore((state) => state.sidebarVisible)
	const mainPaddingDisabled = useLayoutStore((state) => state.mainPaddingDisabled)
	const setHeaderPinned = useLayoutStore((state) => state.setHeaderPinned)
	const theme = useTheme()
	const { pinned: isHeaderPinned } = useHeadroom({ fixedAt: 120 })

	useEffect(() => {
		setHeaderPinned(isHeaderPinned)
	}, [isHeaderPinned, setHeaderPinned])

	return (
		<AppShell
			layout="alt"
			padding="sm"
			header={ {
				height: theme.other.header.height,
				collapsed: !isHeaderPinned,
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
			className={ clsx(classes.appLayout, {
				[shellRootKeepsHeaderScrollSlot]: !isHeaderPinned,
			}) }
		>
			<AppShell.Header withBorder={ false }>
				<AppHeader />
			</AppShell.Header>

			<AppShell.Navbar px={ 0 } pt="sm" className={ clsx(classes.navMenu) }>
				<AppSidebar />
			</AppShell.Navbar>

			<AppFooter />

			<AppShell.Main className={ clsx(classes.main, { paddingDisabled: mainPaddingDisabled }) }>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}
