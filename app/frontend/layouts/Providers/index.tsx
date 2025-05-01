import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

import IconProvider from "./IconProvider"
import UiFrameworkProvider from "./UiFrameworkProvider"

import "./reset.css"
import "@mantine/core/styles.css"
import "@mantine/tiptap/styles.css"
import "@mantine/dropzone/styles.css"
import "./global.css"

interface ProviderProps {
	children?: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = React.memo(({ children }: ProviderProps) => {
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

export default Providers
