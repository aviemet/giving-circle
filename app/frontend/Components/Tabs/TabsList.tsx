import React from 'react'
import { TabsListProps, Tabs } from '@mantine/core'
import cx from 'clsx'
import * as classes from './Tabs.css'

interface TabsListComponentProps extends TabsListProps {
	scrollOverflow?: boolean
}

const TabsList = ({ scrollOverflow = true, className, ...props }: TabsListComponentProps) => {
	return (
		<Tabs.List
			className={ cx(className, { [classes.scrollTabsList]: scrollOverflow }) }
			{ ...props }
		/>
	)
}

export default TabsList
