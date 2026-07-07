import { router } from "@inertiajs/react"
import React from "react"

import { Page, Box, Section, Tabs, Paper } from "@/components"
import { Routes, px } from "@/lib"
import { useViewportSize, useLocation, useTheme, usePageProps } from "@/lib/hooks"

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

const settingsTabRoutes: Record<string, () => string> = {
	general: Routes.settingsGeneral,
	appearance: Routes.settingsAppearance,
	notifications: Routes.settingsNotifications,
	integrations: Routes.settingsIntegrations,
}

function SettingsLayoutComponent({ children }: SettingsLayoutProps) {
	const title = "Settings"
	const { width } = useViewportSize()
	const theme = useTheme()
	const { params, active_circle, circles } = usePageProps()
	const circleSlug = typeof params.circle_slug === "string"
		? params.circle_slug
		: active_circle?.slug ?? circles?.[0]?.slug
	const usedWidth = width === 0 ? window.innerWidth : width
	const isMobileSized = usedWidth < px(theme.breakpoints.sm)

	const { paths } = useLocation()

	const handleTabChange = (value: string | null) => {
		if(!value) return

		if(value === "mail") {
			if(!circleSlug) return

			router.get(Routes.settingsSmtps({ circle_slug: circleSlug }), {}, { preserveState: true })
			return
		}

		const routeForTab = settingsTabRoutes[value]
		if(!routeForTab) return

		router.get(routeForTab(), {}, { preserveState: true })
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
