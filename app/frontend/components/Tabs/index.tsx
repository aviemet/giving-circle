import { Tabs, type TabsProps } from "@mantine/core"
import React from "react"

import TabsList from "./TabsList"
import UrlTabs from "./UrlTabs"

export interface TabsComponentProps extends TabsProps {
	urlControlled?: boolean
	dependencies?: Record<string, string | string[]>
}

const TabsComponent = ({ children, urlControlled = false, ...props }: TabsComponentProps) => {
	return urlControlled ?
		<UrlTabs { ...props }>{ children }</UrlTabs>
		:
		<Tabs { ...props }>{ children }</Tabs>
}

TabsComponent.List = TabsList
TabsComponent.Tab = Tabs.Tab
TabsComponent.Panel = Tabs.Panel

export default TabsComponent
