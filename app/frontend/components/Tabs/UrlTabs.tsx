import { type VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { Tabs } from "@mantine/core"

import { coerceArray } from "@/lib"
import { useInit } from "@/lib/hooks"

import { TabsComponentProps } from "."


const UrlTabs = ({ children, onChange, defaultValue, dependencies, ...props }: TabsComponentProps) => {
	const navigateTab = (value: string | null, options?: VisitOptions) => {
		let only: string[] = []
		if(value && dependencies?.[value]) {
			only = coerceArray(dependencies[value])
		}

		router.reload(Object.assign({
			preserveState: true,
			preserveScroll: true,
			data: { tab: value },
			only,
		}, options || {}))
	}

	// Handle direct navigation to tabbed page
	useInit(() => {
		if(!activeTab() && defaultValue) {
			navigateTab(defaultValue, { replace: true })
		} else {
			document.addEventListener("inertia:navigate", function reloadActiveTab() {
				navigateTab(activeTab())
				document.removeEventListener("inertia:navigate", reloadActiveTab)
			})
		}
	})

	const handleTabChange = (value: string | null) => {
		navigateTab(value || activeTab())

		if(onChange) onChange(value || activeTab())
	}

	return (
		<Tabs
			defaultValue={ activeTab() || defaultValue }
			keepMounted={ false }
			onChange={ handleTabChange }
			{ ...props }
		>
			{ children }
		</Tabs>
	)
}

export default UrlTabs

// Utility Functions

const activeTab = () => {
	const url = new URL(window.location.href)

	return url.searchParams.get("tab")
}
