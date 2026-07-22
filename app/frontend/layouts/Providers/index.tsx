import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

import { IconProvider } from "./IconProvider"
import { UiFrameworkProvider } from "./UiFrameworkProvider"

import "./reset.css"
import "@mantine/core/styles.css"
import "@mantine/tiptap/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/spotlight/styles.css"
import "mantine-contextmenu/styles.layer.css"
import "mantine-datatable/styles.css"
import "./global.css"

interface ProviderProps {
	children?: React.ReactNode
}

const queryClient = new QueryClient()

export const Providers = React.memo(({ children }: ProviderProps) => {
	return (
		<QueryClientProvider client={ queryClient }>
			<UiFrameworkProvider>
				<IconProvider>
					{ children }
				</IconProvider>
			</UiFrameworkProvider>
		</QueryClientProvider>
	)
})
