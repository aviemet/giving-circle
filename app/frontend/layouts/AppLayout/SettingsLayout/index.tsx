import { router } from "@inertiajs/react"
import React from "react"

import { Page, Box, Section, Tabs, Paper } from "@/components"
import { px } from "@/lib"
import { useViewportSize, useLocation, useTheme } from "@/lib/hooks"

interface SettingsLayoutProps {
	children: React.ReactNode
}

type Tab = {
	name: string
	label: string
	icon?: React.ReactNode
}

const tabs: Tab[] = [
	{ name: "general", label: "General" },
	{ name: "appearance", label: "Appearance" },
	{ name: "mail", label: "Mail" },
	{ name: "notifications", label: "Notifications" },
	{ name: "integrations", label: "Integrations" },
]

function SettingsLayoutComponent({ children }: SettingsLayoutProps) {
	const title = "Settings"
	const { width } = useViewportSize()
	const theme = useTheme()
	const usedWidth = width === 0 ? window.innerWidth : width
	const isMobileSized = usedWidth < px(theme.breakpoints.sm)

	const { paths } = useLocation()

	const handleTabChange = (value: string | null) => {
		router.get(`/admin/settings/${value}`, {}, { preserveState: true })
	}

	return (
		<Page title={ title }>
			<Section fullHeight>
				<Tabs
					orientation={ isMobileSized ? "horizontal" : "vertical" }
					variant="pills"
					defaultValue={ paths[1] }
					onChange={ handleTabChange }
				>
					<Paper withBorder p="xs" shadow="sm">
						<Tabs.List
							style={ isMobileSized
								? {
									flexWrap: "nowrap",
									overflow: "auto",
								}
								: {} }
						>
							{ tabs.map(tab => (
								<Tabs.Tab key={ tab.name } value={ tab.name } role="link" >
									{ tab.label }
								</Tabs.Tab>
							)) }
						</Tabs.List>
					</Paper>

					{ tabs.map(tab => (
						<Tabs.Panel key={ tab.name } value={ tab.name } pl="xs" style={ { position: "relative" } }>
							<Box p="lg" style={ { height: "100%" } }>
								{ children }
							</Box>
						</Tabs.Panel>
					)) }

				</Tabs>
			</Section>
		</Page>
	)
}

export const SettingsLayout = React.memo(SettingsLayoutComponent)
