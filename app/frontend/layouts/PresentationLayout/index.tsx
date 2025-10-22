import clsx from "clsx"
import { useEffect } from "react"

import { AppShell } from "@/components"
import { useHeadroom, useTheme } from "@/lib/hooks"
import useLayoutStore from "@/store/LayoutStore"

import { LayoutProps } from ".."
import PresentationFooter from "./PresentationFooter"
import PresentationHeader from "./PresentationHeader"
import * as classes from "./PresentationLayout.css"
import PresentationSidebar from "./PresentationSidebar"

const PresentationLayout = ({ children }: LayoutProps) => {
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
			className={ clsx(classes.presentationLayout) }
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

export default PresentationLayout
