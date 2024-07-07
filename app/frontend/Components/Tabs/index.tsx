import React from 'react'
import { Tabs, type TabsProps } from '@mantine/core'
import UrlTabs from './UrlTabs'
import TabsList from './TabsList'

export interface TabsComponentProps extends TabsProps {
	urlControlled?: boolean
	dependencies?: Record<string, string|string[]>
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
