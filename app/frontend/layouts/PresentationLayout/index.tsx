import clsx from "clsx"
import { useEffect } from "react"

import { AppShell } from "@/components"
import { useHeadroom, useTheme } from "@/lib/hooks"
import { useLayoutStore } from "@/store"

import { LayoutProps } from ".."
import { shellRootKeepsHeaderScrollSlot } from "../AppShellHeaderOffsetWhenCollapsed.css"
import { PresentationFooter } from "./PresentationFooter"
import { PresentationHeader } from "./PresentationHeader"
import * as classes from "./PresentationLayout.css"
import { PresentationSidebar } from "./PresentationSidebar"

export function PresentationLayout({ children }: LayoutProps) {
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
			padding="md"
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
			className={ clsx(classes.presentationLayout, {
				[shellRootKeepsHeaderScrollSlot]: !isHeaderPinned,
			}) }
		>
			<AppShell.Header withBorder={ false }>
				<PresentationHeader />
			</AppShell.Header>

			<AppShell.Navbar px={ 0 } pt="sm" className={ clsx() }>
				<PresentationSidebar />
			</AppShell.Navbar>

			<AppShell.Main className={ clsx(classes.main, { paddingDisabled: mainPaddingDisabled }) }>
				{ children }
			</AppShell.Main>
		</AppShell>
	)
}
